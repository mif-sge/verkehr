const logger = require('./../../logger');

const con = require('./../lib/database/connection');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'LOCATION_REMOVED',

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

        await con.cypher('MATCH (h { id: {id} }) DETACH DELETE h', {
            id: json.id
        });
    }
};