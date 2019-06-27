const logger = require('./../../logger');

const RoutePlanning = require('./../lib/computing/route-planning');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'OPTIMIZE_ROUTES',

    /**
     * The callback for handling errors.
     * @type {function}
     */
    onError: (err, eventSystem) => {
        logger.error(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: async (payload, eventSystem) => {
        
        let vehiclePool = require('./../../config/traffic').vehiclePool;

        RoutePlanning.optimizeRoutes({
            vehicles: vehiclePool.vehicles,
            depot: vehiclePool.depot,
            maxDistance: vehiclePool.maxDistance
        }, (err, response) => {

            if(err) {
                logger.error(err);
                return;
            }

            logger.info('Optimized routes.');

            eventSystem.client.publish('ROUTES_OPTIMIZED', JSON.stringify(response));
        });
    }
};