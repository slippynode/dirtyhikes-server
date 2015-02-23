module.exports = function () {

  this.trails: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 254, nullable: false},
    state: {type: 'string', maxlength: 25, nullable: false},
    state_id: {type: 'string', maxlength: 2, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  };

  this.geography: {
    id: {type: 'increments', nullable: false, primary: true},
    trail_id: {type: 'integer', nullable: false, unsigned: true},
    start_pt: {type: 'decimal', precision: 10, scale: 7, nullable: false},
    end_pt: {type: 'decimal', precision: 10, scale: 7, nullable: false},
    high_elev: {type: 'decimal', precision: 7, scale: 2, nullable: false},
    low_elev: {type: 'decimal', precision: 7, scale: 2, nullable: false},
    geometry: {},
    profile: {}
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  };

}