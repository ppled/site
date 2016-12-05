/* global $ */

(function (factory) {
  var PP = window.PP = window.PP || {}

  PP.stock = factory()
})(function () {
  var store = {
    estimate: false
  }

  /**
   * Updates the indicator based on the provided variant
   */
  function update (variant) {
    var $indicator = $('#stock-indicator')
    var status

    if (variant.available) {
      if (variant.inventory_quantity > 0) {
        status = 'in stock'
      } else {
        status = 'in stock soon'

        if (store.estimate) {
          status += '; ' + store.estimate
        }
      }
    } else {
      status = 'out of stock'
    }

    $indicator.text(status)
  }

  /**
   * Finds the stock-soon tag and initializes the stock
   * indicator
   */
  function init (tags) {
    var stockTag

    tags
      .split(' ')
      .forEach(function (tag) {
        var regex = /^stock-soon(:\d{1,2}[dmw])?/i

        if (regex.test(tag)) {
          stockTag = tag
        }
      })

    if (stockTag.indexOf(':')) {
      // TODO: parse estimate tag
    }
  }

  return {
    init: init,
    update: update
  }
}); // eslint-disable-line semi
