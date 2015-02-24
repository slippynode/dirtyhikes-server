var config = require('../../config')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , _ = require('lodash')
  , sequence = require('when/sequence')
  , schema = require('./schema')
;

function DB () {
  this.init(arguments[0]);
}

DB.prototype.init = function () {

  this.schema = schema;

  var stream = knex.select(
      [
        'osm_id',
        'highway',
        'route',
        'name',
        knex.raw('ST_AsGeoJSON(ST_EndPoint(way)) as geo_start_pt'),
        knex.raw('ST_AsGeoJSON(ST_StartPoint(way)) as geo_end_pt'),
        knex.raw('ST_AsGeoJSON(way) as geo_line')
      ]
    ).from('planet_osm_line')
    .where(function () {
      this.where({'highway': 'path'})
      .orWhere({'highway': 'footway'})
      .orWhere({'highway': 'track'})
      .orWhere({'route': 'hiking'})
    })
    .whereNotNull('name')
    .stream()
  ;

  stream.on('data', function (chunk) {
    console.log(chunk);
  })

  stream.on('end', function () {
    console.log('DONE');
  })
}

DB.prototype.createTable = function (table) {
  var self = this;

  knex.schema.hasTable(table).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(table, function (t) {
        var column
          , keys
        ;

        keys = _.keys(self.schema[table]);

        _.each(keys, function (k) {
          if (self.schema[table][k].type === 'string' && self.schema[table][k].hasOwnProperty('maxlength')) {
            column = t[self.schema[table][k].type](k, self.schema[table][k].maxlength);
          }
          else if (self.schema[table][k].type === 'decimal'
            && self.schema[table][k].hasOwnProperty('precision')
            && self.schema[table][k].hasOwnProperty('scale')) {
              column = t[self.schema[table][k].type](k, self.schema[table][k].precision, self.schema[table][k].scale);
          }
          else if (self.schema[table][k].type === 'linestring') {
            column = t.specificType(k, knex.raw('geography(LINESTRING,4326)'));
          }
          else if (self.schema[table][k].type === 'point') {
            column = t.specificType(k, knex.raw('geography(POINT,4326)'));
          }
          else {
            column = t[self.schema[table][k].type](k);
          }

          if (self.schema[table][k].hasOwnProperty('primary') && self.schema[table][k].primary === true) {
            column.primary();
          }

          if (self.schema[table][k].hasOwnProperty('nullable') && self.schema[table][k].nullable === true) {
            column.nullable();
          }
          else {
            column.notNullable();
          }

          if (self.schema[table][k].hasOwnProperty('unsigned') && self.schema[table][k].unsigned === true) {
            column.unsigned();
          }
        });
      });
    }
  });
}

DB.prototype.sync = function () {
  var self
    , tables
    , names
  ;

  self = this;
  names = _.keys(self.schema);
  tables = _.map(names, function (name) {
    return function () {
      return self.createTable(name);
    };
  });
  return sequence(tables)
}



module.exports = DB;