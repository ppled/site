/*
 * Using this module so plugins are loaded once then
 * cached
 */
'use strict'

const plugins = require('gulp-load-plugins')({
  camelize: true
})

// rename cache plugin
plugins.cache = plugins.cached
delete plugins.cached

module.exports = plugins
