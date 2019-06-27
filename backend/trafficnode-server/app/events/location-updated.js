const logger = require('./../../logger');

const con = require('./../lib/database/connection');
const locationtypeToLabelConverter = require('./../util/locationtype-to-label-converter');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'LOCATION_UPDATED',

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

        let node = await con.cypher('MATCH (h { SmartCityId: {id} }) RETURN h', { id: json.id }).then(res => {
            if(res.records.length === 0) {
                return false;
            }

            return res.records[0].get('h');
        });

        if(!node) {
            logger.warn("Node not found.");
            return;
        }

        if(json.name) {
            await con.cypher('MATCH (h { SmartCityId: {id} }) SET h.name = {name}', { id: json.id, name: json.name });
        }

        if(json.type) {
            let label = locationtypeToLabelConverter(json.type);

            await con.cypher("MATCH (h { SmartCityId: {id} }) REMOVE h:Hospital:Shop SET h:" + label, {
                id: json.id
            });
        }
    }
};