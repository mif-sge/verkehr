const logger = require('./../../logger');

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'REQUEST_STAFF_INFO',

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
        eventSystem.client.publish('STAFF_INFO_REQUESTED', JSON.stringify({
            id: 'traffic',
            staff: [
                {
                    employee_type: "construction_worker",
                    count: 42
                },
                {
                    employee_type: "developer",
                    count: 4
                },
                {
                    employee_type: "controller",
                    count: 11
                }
            ]
        }));
    }
};