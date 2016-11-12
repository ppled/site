'use strict'

const config = require('./config.js')

/**
 * throws the provided error
 */
function error (message) {
  throw new Error(message)
}

/**
 * Resolves/combines config bower-globs into a
 * single array
 *
 * @returns {array}
 */
function getBowerGlobs () {
  const bowerGlobs = config['bower-globs']
  const result = []

  for (let name in bowerGlobs) {
    let globs = bowerGlobs[name]

    // convert to array
    if (typeof globs === 'string') {
      globs = [globs]
    }

    // add globs
    globs.forEach(glob => {
      var fullpath = `bower_components/${name}/${glob}`

      result.push(fullpath)
    })
  }

  return result
}

module.exports = {
  error,
  getBowerGlobs
}
