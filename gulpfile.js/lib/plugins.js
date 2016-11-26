'use strict'

const config = require('./config.js')
const loadPlugins = require('gulp-load-plugins')
const u = require('./utils.js')

/**
 * Sets the cache path for gulp-local-cache
 */
function cache (localCache) {
  // set cache path
  localCache.path(u.getCachePath())

  return localCache
}

/**
 * Wrapper for gulp-shopify-upload that fills in shopify
 * API info
 */
function upload (shopifyUpload) {
  return basePath => {
    const {
      api_key,
      api_password,
      store_url
    } = config.shopify

    return shopifyUpload(
      api_key,
      api_password,
      store_url,
      null,
      { basePath }
    )
  }
}

module.exports = loadPlugins({
  camelize: true,
  rename: {
    'gulp-local-cache': 'cache',
    'gulp-shopify-upload': 'upload'
  },
  postRequireTransforms: {
    cache,
    upload
  }
})
