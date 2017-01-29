/* global $ */

(function (factory) {
  var PP = window.PP = window.PP || {}

  PP.stock = factory()
})(function () {
  var store = {
    atcText: {
      in: 'Add to Cart',
      soon: 'Pre-order',
      out: 'Sold Out'
    },
    estimate: false,
    statusText: {
      in: 'In stock',
      soon: 'In stock soon. Pre-order now',
      out: 'Out of stock'
    }
  }

  /**
   * Updates the indicator according to the provided status
   */
  function applyStatus (status) {
    var $atc = $('button#AddToCart > span')
    var $indicator = $('#stock-indicator')
    var estimate = ''

    if (status === 'soon' && store.estimate) {
      estimate = '<span class="separator">|</span><span class="estimate">Estimated ' + store.estimate + '</span>'
    }

    $indicator
      .removeClass('in')
      .removeClass('soon')
      .removeClass('out')
      .addClass(status)
      .html('<i class="fa"></i><span class="status">' + store.statusText[status] + '</span>' + estimate)

    $atc.text(store.atcText[status])
  }

  /**
   * Refreshes the indicator
   */
  function update (variant) {
    var status

    if (variant.available) {
      if (variant.inventory_quantity > 0) {
        status = 'in'
      } else {
        status = 'soon'
      }
    } else {
      status = 'out'
    }

    applyStatus(status)
  }

  /**
   * @returns {string}
   */
  // TODO: cleanup
  function convertEstimate (est) {
    let result = est
      .replace(/(\d+)w/, "$1 week") // eslint-disable-line quotes
      .replace(/(\d+)m/, "$1 month") // eslint-disable-line quotes

    if (result[0] !== '1') {
      result += 's'
    }

    return result
  }

  /**
   * Parses the stock estimate tag
   */
  function init (tags) {
    var estimate

    tags
      .split(' ')
      .forEach(function (tag) {
        var regex = /^stock-soon:\d{1,2}[dmw]/i

        if (regex.test(tag)) {
          estimate = tag.split(':')[1]
        }
      })

    if (estimate) {
      store.estimate = convertEstimate(estimate)
    }
  }

  return {
    init: init,
    update: update
  }
}); // eslint-disable-line semi
