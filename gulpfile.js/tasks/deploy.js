'use strict'

const del = require('del')
const g = require('../lib/plugins.js')
const gulp = require('gulp')
const u = require('../lib/utils.js')
const STAGING_DIR = '.upload'

/**
 * Deletes staging directory
 */
function clean () {
  return del(STAGING_DIR)
}

/**
 * Stages bower assets
 */
function stageBower () {
  const globs = u.getBowerGlobs()
  const assets = gulp.src(globs)

  return assets
    .pipe(gulp.dest(`${STAGING_DIR}/assets`))
}

/**
 * Compiles and stages assets
 */
function stageAssets () {
  const assets = gulp.src('src/assets/**/*.*')

  return assets
    .pipe(g.flatten())
    .pipe(gulp.dest(`${STAGING_DIR}/assets`))
}

/**
 * Stages non-asset theme files
 */
function stageTheme () {
  const theme = gulp.src([
    'src/**/*.*',
    '!src/assets/**/*'
  ])

  return theme
    .pipe(gulp.dest(STAGING_DIR))
}

/**
 * Deploys staged theme files to Shopify store
 */
 // TODO: track deleted files and remove them from remote
function deploy () {
  const theme = gulp.src(`${STAGING_DIR}/**/*.*`)

  return theme
    .pipe(g.cache.filter())
    .pipe(g.upload(STAGING_DIR))
}

// stage:assets
gulp.task('assets:bower', ['deploy:clean'], stageBower)
gulp.task('assets:custom', ['deploy:clean'], stageAssets)

// deploy:stage
gulp.task('stage:assets', ['assets:bower', 'assets:custom'])
gulp.task('stage:theme', ['deploy:clean'], stageTheme)
gulp.task('deploy:stage', ['stage:assets', 'stage:theme'])

// deploy
gulp.task('deploy:clean', clean)
gulp.task('deploy', ['deploy:clean', 'deploy:stage'], deploy)
