'use strict'

/**
 * throws the provided error
 */
function error (message) {
  throw new Error(message)
}

module.exports = {
  error
}
