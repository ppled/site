'use strict'

const config = require('./config.js')
const loadPlugins = require('gulp-load-plugins')
const u = require('./utils.js')
const plugins = loadPlugins({ camelize: true })
const shopifyUpload = plugins.shopifyUpload

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

  return shopifyUpload(
    api_key,
    api_password,
    store_url,
    null,
    { basePath }
  )
}

// aliases
plugins.cache = plugins.localCache
plugins.upload = upload

// cache path
plugins.cache.path(u.getCachePath())

module.exports = plugins
