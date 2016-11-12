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
    .pipe(g.cached('stage-bower'))
    .pipe(g.debug({ title: 'stage-bower' }))
    .pipe(gulp.dest(`${STAGING_DIR}/assets`))
}

/**
 * Compiles and stages assets
 */
function stageAssets () {
  const assets = gulp.src([
    'src/assets/css/*.scss.liquid',
    'src/assets/img/*.jpg',
    'src/assets/img/*.png',
    'src/assets/js/*.js',
    'src/assets/js/*.js.liquid'
  ])

  return assets
    .pipe(g.cached('stage-assets'))
    .pipe(g.debug({ title: 'stage-assets' }))
    .pipe(gulp.dest(`${STAGING_DIR}/assets`))
}

/**
 * Stages non-asset theme files
 */
function stageTheme () {
  const theme = gulp.src([
    'src/**/*',
    '!src/assets',
    '!src/assets/**/*'
  ])

  return theme
    .pipe(g.cached('stage-theme'))
    .pipe(g.debug({ title: 'stage-theme' }))
    .pipe(gulp.dest(STAGING_DIR))
}

/**
 * Deploys staged theme files to Shopify store
 */
 // TODO: possibly get all remote theme files and delete any that don't exist in repo
function deploy () {
  const theme = gulp.src(`${STAGING_DIR}/**/*`)

  return theme
    .pipe(g.cached('deploy'))
    .pipe(g.debug({ title: 'deploy' }))
    // .pipe(upload(STAGING_DIR))
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
