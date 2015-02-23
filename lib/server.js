var express = require('express')
  , dirtyDB = require('./db')
;

var server = express();
server.set('port', process.env.port || 3030);

module.exports = function (callback) {
  var db = new dirtyDB();
  db.sync()
    .then(function () {
      callback(null, server);
    })
    .otherwise(function (error) {
      callback(error);
    })
  ;
}