'use strict'

const minimist = require('minimist')

// resolve cli options
module.exports = minimist(process.argv, {
  prod: false
})
