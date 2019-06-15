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
        console.log(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: (payload, eventSystem) => {
        console.log(payload.toString());
    }
};