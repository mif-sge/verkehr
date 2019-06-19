'use strict';

const OccupancyPrediction = require('./../../../lib/computing/occupancy-prediction');

/**
 * Returns the occupancy.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    if(!request.query.routeId || !request.query.stopId || !request.query.timestamp) {
        return h.response().code(400);
    }

    return new Promise((resolve, reject) => {
        OccupancyPrediction.predict({
            routeId: request.query.routeId,
            stopId: request.query.stopId,
            timestamp: request.query.timestamp
        }, (err, response) => {
            if(err) {
                return reject(err);
            }
            return resolve({ boardings: response.boardings });
        });
    });
};

module.exports = {
    handler
};