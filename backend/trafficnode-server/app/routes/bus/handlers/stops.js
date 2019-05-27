'use strict';

/**
 * Returns all stops.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    if(request.query.requestMode === 'short') {       
        return h.response([
            {
                id: 1,
                name: 'Haltestelle 1'
            },
            {
                id: 2,
                name: 'Haltestelle 2'
            },
            {
                id: 3,
                name: 'Haltestelle 3'
            }
        ]).code(200);
    }

    return h.response([
        {
            id: 1,
            name: 'Haltestelle 1',
            lat: 1,
            lon: 1
        },
        {
            id: 2,
            name: 'Haltestelle 2',
            lat: 3,
            lon: 3
        },
        {
            id: 3,
            name: 'Haltestelle 3',
            lat: 1,
            lon: 3
        }
    ]).code(200);
};

module.exports = {
    handler
};