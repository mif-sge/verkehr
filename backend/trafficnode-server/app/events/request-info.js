const logger = require('./../../logger');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'REQUEST_INFO',

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
        eventSystem.client.publish('INFO_REQUESTED', JSON.stringify(Object.assign(require('./../../config/molecule'), {
            state: [
                {
                    name: "Anzahl der Bushaltestellen",
                    value: 42
                }
            ]
        })));
    }
};