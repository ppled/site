'use strict'

const gulp = require('gulp')

/**
 * Watches source files and deploys on file save
 */
function watch () {
  gulp.watch('src/**/*', ['deploy'])
}

gulp.task('watch', watch)
