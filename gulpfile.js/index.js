'use strict'

const gulp = require('gulp')
const requireDir = require('require-dir')

// include tasks
requireDir('./tasks')

gulp.task('default', ['deploy:stage'])
