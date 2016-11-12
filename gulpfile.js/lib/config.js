'use strict'

const flags = require('./flags.js')
const u = require('./utils.js')

/**
 * @returns {object}
 */
function getConfigFile (filename) {
  try {
    return require(`${__dirname}/../${filename}.json`)
  } catch (error) {
    return false
  }
}

/**
 * Finds the appropriate Shopify config to use
 * based on the desired environment
 *
 * @returns {object}
 */
function getShopify () {
  const files = {
    dev: 'shopify-dev',
    prod: 'shopify-prod',
    default: 'shopify'
  }
  var result

  if (flags.prod) {
    result = getConfigFile(files.prod)

    if (!result) {
      u.error('no production shopify config found')
    }
  } else {
    result = getConfigFile(files.dev)

    if (!result) {
      result = getConfigFile(files.default)
    }
  }

  if (!result) {
    u.error('no shopify config found')
  }

  return result
}

/**
 * Compiles main and shopify configs
 *
 * @returns {object}
 */
function get () {
  const result = getConfigFile('config')

  if (!result) {
    u.error('no config found')
  } else {
    result.shopify = getShopify()
  }

  return result
}

module.exports = get()
