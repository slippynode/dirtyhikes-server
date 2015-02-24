module.exports = {

  trails: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 254, nullable: false},
    state: {type: 'string', maxlength: 25, nullable: false},
    state_id: {type: 'string', maxlength: 2, nullable: false},
    osm_id: {type: 'integer', nullable: false, unsigned: true},
    osm_highway: {type: 'string', maxlength: '10', nullable: true},
    osm_route: {type: 'string', maxlength: '10', nullable: true},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },

  geographies: {
    id: {type: 'increments', nullable: false, primary: true},
    start: {type: 'point', nullable: false},
    end: {type: 'point', nullable: false},
    line: {type: 'linestring', nullable: false},
    length_m : {type: 'decimal', precision: 10, scale: 10, nullable: false},
    length_ft: {type: 'decimal', precision: 10, scale: 10, nullable: false},
    profile: {type: 'linestring', nullable: false},
    high_elev: {type: 'decimal', precision: 7, scale: 2, nullable: false},
    low_elev: {type: 'decimal', precision: 7, scale: 2, nullable: false},
    epsg: {type: 'integer', nullable: false, unsigned: true},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  }

}