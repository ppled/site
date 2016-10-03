'use strict';

const fs = require('fs');
const flags = require('./flags.js');

/**
 * throws the provided error
 */
function error(message) {
    throw new Error(message);
}

/**
 * @returns {boolean}
 */
function configExists(filename) {
    return fs.existsSync(`./gulpfile.js/${filename}.json`);
}

/**
 * @returns {object}
 */
function getConfig(filename) {
    return require(`./${filename}.json`);
}

/**
 * Finds the appropriate Shopify config to use
 * based on the desired environment
 *
 * @returns {object|boolean}
 */
function get() {
    var result = false;
    const files = {
        dev: 'shopify-dev',
        prod: 'shopify-prod',
        std: 'shopify'
    };

    // prod
    if(flags.prod) {

        if(!configExists(files.prod))
            error('no production shopify config found');

        else result = getConfig(files.prod);
    }

    // not prod
    else {

        // dev config
        if(configExists(files.dev))
            result = getConfig(files.dev);

        // standard config
        else if(configExists(files.std))
            result = getConfig(files.std);
    }

    // no config
    if(!result)
        error('no shopify config found');

    return result;
}

module.exports = {
    get
};
