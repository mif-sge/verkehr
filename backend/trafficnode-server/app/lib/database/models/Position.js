/**
 * The schema of a Node represents a Pint on the map (Coordinates)
 */
let Position = {

    /**
     * The unique identification number.
     * @type {uuid}
     */
    id: {
        type: 'uuid',
        primary: true
    },
    /**
     * The position of the location.
     * @type {float}
     */
    longitude: {
        type: 'float'
    },
    /**
     * The position of the location.
     * @type {float}
     */
    latitude: {
        type: 'float'
    }

};

module.exports = Position;
