'use strict';

const World = require('./../../../lib/world');

/**
 * Verifies the request and returns the string 'Hello World!'.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    let world = new World();
    let value = world.hello();

    return h.response(value).code(200);
};

module.exports = {
    handler
};