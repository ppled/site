'use strict'

const config = require('./config.js')
const each = require('u-each')
const flags = require('./flags.js')

/**
 * Resolves/combines config bower-globs into a
 * single array
 *
 * @returns {array}
 */
function getBowerGlobs () {
  const bowerGlobs = config['bower-globs']
  const result = []

  each(bowerGlobs, (name, globs) => {
    // convert to array
    if (typeof globs === 'string') {
      globs = [globs]
    }

    // add globs
    each(globs, glob => {
      const fullpath = `bower_components/${name}/${glob}`

      result.push(fullpath)
    })
  })

  return result
}

/**
 * @returns {string}
 */
function getCachePath () {
  const filename = flags.prod ? 'prod' : 'dev'

  return `.cache/${filename}`
}

module.exports = {
  getCachePath,
  getBowerGlobs
}
