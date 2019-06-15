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
        console.log(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: (payload, eventSystem) => {
        let json = JSON.parse(payload.toString());

        eventSystem.client.publish('STAFF_INFO_REQUESTED', JSON.stringify({
            id: 'traffic',
            staff: [
                {
                    employee_type: "construction_worker",
                    count: 42
                }
            ]
        }));
    }
};