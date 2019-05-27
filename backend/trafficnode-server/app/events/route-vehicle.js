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
        console.log(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: (payload, eventSystem) => {
        let json = JSON.parse(payload.toString());

        eventSystem.client.publish('VEHICLE_ROUTED', JSON.stringify({
            route: [
                {
                    name: "Max-Mustermann-Straße",
                    to: "Kreuzung Max-Mustermann-Straße/Mindenerstraße"
                },
                {
                    name: "Mindenerstraße",
                    to: "Kreuzung Mindenerstraße/Max-Mustermann-Straße"
                }
            ]
        }));
    }
};