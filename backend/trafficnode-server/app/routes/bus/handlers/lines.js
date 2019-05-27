'use strict';

/**
 * Returns all lines.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    if(request.query.requestMode === 'short') {
        return h.response([
            {
                id: 1,
                name: 'Buslinie 1',
                stops: [
                    1, 2, 3
                ]
            }
        ]).code(200);
    }

    return h.response([
        {
            id: 1,
            name: 'Buslinie 1',
            stops: [
                1, 2, 3
            ],
            coordinates: [
                {
                    lat: 1,
                    lon: 1,
                },
                {
                    lat: 3,
                    lon: 3
                },
                {
                    lat: 1,
                    lon: 3
                }
            ]
        }
    ]).code(200);
};

module.exports = {
    handler
};