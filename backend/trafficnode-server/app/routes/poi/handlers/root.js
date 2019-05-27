'use strict';

const pois = {
    hospitals: [
        {
            id: 1,
            name: 'Krankenhaus 1',
            lat: 10,
            lon: 10
        },
        {
            id: 2,
            name: 'Krankenhaus 2',
            lat: 11,
            lon: 11
        }
    ],
    malls: [
        {
            id: 1,
            name: 'Einkaufszentrum 1',
            lat: 20,
            lon: 20
        },
        {
            id: 2,
            name: 'Einkaufszentrum 2',
            lat: 21,
            lon: 21
        }
    ]
};

/**
 * Returns POIs.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    if(!request.query.types) {
        return h.response(pois).code(200);
    }

    let result = {};

    for(var type of request.query.types.split(',')) {
        if(pois[type]) {
            result[type] = pois[type];
        }
    }

    return h.response(result).code(200);
};

module.exports = {
    handler
};