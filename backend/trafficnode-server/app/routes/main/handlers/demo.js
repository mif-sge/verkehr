'use strict';

const DataService = require('./../../../lib/dataService');

/**
 * Returns demo data from a database (if reachable).
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    let data = new DataService();

    return data.getAll('Bus_Stop').then(result => {
        return h.response(result).code(200);
    }).catch(err => {
        return h.response(err).code(500);
    });
};

module.exports = {
    handler
};
