'use strict'

const config = require('./config.js')
const loadPlugins = require('gulp-load-plugins')
const u = require('./utils.js')
const plugins = loadPlugins({
  camelize: true,
  rename: {
    'gulp-local-cache': 'cache'
  },
  postRequireTransforms: {
    cache: cache => {
      // set cache path
      cache.path(u.getCachePath())

      return cache
    }
  }
})

/**
 * Wrapper for gulp-shopify-upload that fills in shopify
 * API info
 */
function upload (basePath) {
  const {
    api_key,
    api_password,
    store_url
  } = config.shopify

  return plugins.shopifyUpload(
    api_key,
    api_password,
    store_url,
    null,
    { basePath }
  )
}

// add upload wrapper
plugins.upload = upload

module.exports = plugins
