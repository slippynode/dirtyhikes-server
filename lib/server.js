var express = require('express')
  , dirtyDB = require('./db')
  , db = new dirtyDB()
  , routes = require('./routes')(db)
;

var server = express();
server.set('port', process.env.port || 3030);

module.exports = function (callback) {
  db.sync()
    .then(function () {
      callback(null, server);
    })
    .otherwise(function (error) {
      callback(error);
    })
  ;
}