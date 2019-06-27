const logger = require('./../../logger');

const con = require('./../lib/database/connection');
const occupancyValidator = require('./../util/occupancy-validator');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'LOCATION_OCCUPANCY_UPDATED',

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

        let json = null;

        try {
            json = JSON.parse(payload.toString());
        } catch {
            logger.warn("Wrong format.");
            return;
        }

        if(!occupancyValidator(json.occupancy)) {
            return;
        }

        await con.cypher('MATCH (h { SmartCityId: {id} }) SET h.occupancy = {occupancy}', { id: json.id, occupancy: json.occupancy });
    }
};