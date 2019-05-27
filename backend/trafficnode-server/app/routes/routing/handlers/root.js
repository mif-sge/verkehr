'use strict';

/**
 * Returns POIs.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    return h.response([
        {
            id: 1,
            from: 1,
            to: 5
        },
        {
            id: 2,
            from: 5,
            to: 7
        }
    ]).code(200);
};

module.exports = {
    handler
};