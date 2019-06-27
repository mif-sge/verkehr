const logger = require('./../../logger');

const Navigation = require('./../lib/computing/navigation');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'ROUTE_VEHICLE',

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
    onMessage: (payload, eventSystem) => {

        let json = null;

        try {
            json = JSON.parse(payload.toString());
        } catch {
            logger.warn("Wrong format.");
            return;
        }

        return new Promise((resolve, reject) => {

            let has = typeof(json.target_position) !== 'string';

            Navigation.vehicleRoute({
                current: json.current_position,
                hasTargetPosition: has,
                targetPosition: has ? json.target_position : {},
                targetLocation: has ? "" : json.target_position
            }, (err, response) => {
                if (err) {
                    logger.error(err.details);
                    return reject(err);
                }

                if (!response.steps) {
                    return reject('no_steps');
                }

                let route = response.steps.map(step => {
                    return {
                        name: step.street,
                        to: step.intersection
                    }
                });

                eventSystem.client.publish('VEHICLE_ROUTED', JSON.stringify({
                    route: route
                }));

                return resolve();
            });
        });
    }
};