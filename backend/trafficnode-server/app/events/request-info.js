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
        console.log(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: (payload, eventSystem) => {
        let json = JSON.parse(payload.toString());

        eventSystem.client.publish('INFO_REQUESTED', JSON.stringify({
            id: 'traffic',
            name: 'Verkehrsverwaltung',
            description: 'Verwaltung des Verkehrsnetzes.',
            state: [
                {
                    name: "Anzahl der Bushaltestellen",
                    value: 42
                }
            ]
        }));
    }
};