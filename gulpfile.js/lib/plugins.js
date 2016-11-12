'use strict'

const config = require('../config.js')
const plugins = require('gulp-load-plugins')({ camelize: true })
const shopifyUpload = plugins.shopifyUpload

/**
 * Wrapper for gulp-shopify-upload that fills in shopify
 * API info
 */
function upload (basePath = './') {
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

// rename cache plugin
plugins.cache = plugins.cached
delete plugins.cached

// replace shopifyUpload plugin
plugins.upload = upload
delete plugins.shopifyUpload

module.exports = plugins
