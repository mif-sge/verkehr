'use strict';

const logger = require('./../../../../logger');
const Navigation = require('./../../../lib/computing/navigation');

/**
 * Returns POIs.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {

    return new Promise((resolve, reject) => {
        Navigation.vehicleRoute({
            current: {
              lat: request.query.currentlat,
              lon: request.query.currentlon
            },
            hasTargetPosition: request.query.hasTargetPosition,
            targetPosition: {
                lat: request.query.targetlat,
                lon: request.query.targetlon
            },
            targetLocation: request.query.targetLocation
        }, (err, response) => {
            if(err) {
                logger.error(err.details);
                return reject(err);
            }

            return resolve(response);
        });
    });
};

module.exports = {
    handler
};