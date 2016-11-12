'use strict'

const config = require('./config.js')
const loadPlugins = require('gulp-load-plugins')
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

plugins.cache = plugins.cached
plugins.upload = upload

module.exports = plugins
