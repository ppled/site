/* global $ */

(function (factory) {
  var PP = window.PP = window.PP || {}

  PP.stock = factory()
})(function () {
  var store = {
    estimate: false
  }

  /**
   * Updates the indicator according to the provided status
   */
  function applyStatus (status) {
    var $indicator = $('#stock-indicator')
    var estimate = ''
    var title = ''

    switch (status) {
      case 'in':
        title = 'In stock'
        break
      case 'soon':
        title = 'In stock soon. Pre-order now'
        break
      case 'out':
        title = 'Out of stock'
    }

    if (status === 'soon' && store.estimate) {
      estimate = `<span class="separator">|</span><span class="estimate">Estimated ${store.estimate}</span>`
    }

    $indicator
      .removeClass('in')
      .removeClass('soon')
      .removeClass('out')
      .addClass(status)
      .html(`<i class="fa"></i><span class="status">${title}</span>${estimate}`)
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
  function convertEstimate (est) {
    return est
      .replace(/(\d+)w/, "$1 weeks") // eslint-disable-line quotes
      .replace(/(\d+)m/, "$1 months") // eslint-disable-line quotes
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
