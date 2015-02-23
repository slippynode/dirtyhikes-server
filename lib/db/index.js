var config = require('../config')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , schema = require('./schema')
;