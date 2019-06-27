const cron = require('node-cron');

const logger = require('./logger');

const RoutePlanning = require('./app/lib/computing/route-planning');

class Scheduler {

    start() {

        // Schedule route optimization once a week.
        cron.schedule('0 0 * * 0', () => {

            let vehiclePool = require('./config/traffic').vehiclePool;

            RoutePlanning.optimizeRoutes({
                vehicles: vehiclePool.vehicles,
                depot: vehiclePool.depot,
                maxDistance: vehiclePool.maxDistance
            }, (err, response) => {

                if(err) {
                    logger.error(err);
                    return;
                }

                logger.info(response);
            });
        });
    }
};

module.exports = new Scheduler();