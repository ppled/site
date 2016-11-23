'use strict'

const g = require('./lib/plugins.js')
const gulp = require('gulp')
const requireDir = require('require-dir')

// include tasks
requireDir('./tasks')

gulp.task('default', ['deploy:stage'])
gulp.task('clear-cache', g.cache.clear)
