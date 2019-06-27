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

    if(!request.query.from || !request.query.to) {
        return h.response().code(400);
    }

    return new Promise((resolve, reject) => {
        Navigation.busRoute({
            start: request.query.from,
            end: request.query.to
        }, (err, response) => {
            if(err) {
                logger.error(err.details);
                return reject(err);
            }

            return resolve(response.steps.map(s => {
                return {
                    id: s.id,
                    from: s.start,
                    to: s.end
                }
            }));
        });
    });
};

module.exports = {
    handler
};