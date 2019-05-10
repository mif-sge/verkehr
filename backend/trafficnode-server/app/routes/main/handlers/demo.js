'use strict';

const Data = require('./../../../lib/data');

/**
 * Returns demo data from a database (if reachable).
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    let data = new Data();

    return data.demo().then(result => {
        return h.response(result).code(200);
    }).catch(err => {
        return h.response(err).code(500);
    });
};

module.exports = {
    handler
};