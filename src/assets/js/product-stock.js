/* global $ */

(function (factory) {
  var PP = window.PP = window.PP || {}

  PP.stock = factory()
})(function () {
  var store = {
    stockTag: false
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
    tags
      .split(' ')
      .forEach(function (tag) {
        var regex = /stock-soon/

        if (regex.test(tag)) {
          store.stockTag = tag
        }
      })
  }

  return {
    init: init,
    update: update
  }
}); // eslint-disable-line semi
