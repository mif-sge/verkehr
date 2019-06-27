const logger = require('./../../logger');

const con = require('./../lib/database/connection');
const locationtypeToLabelConverter = require('./../util/locationtype-to-label-converter');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'LOCATION_CREATED',

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

        let label = locationtypeToLabelConverter(json.type);

        if(!label) {
            return;
        }

        let position = await con.create('Position', {
            latitude: json.position.lat,
            longitude: json.position.lon,
        });

        let node = await con.create(label, {
            // smartcityid: json.id,
            name: json.name
        });

        await node.relateTo(position, 'locatesOn', {});
    }
};