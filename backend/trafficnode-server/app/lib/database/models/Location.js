/**
 * The schema of a location.
 */
let Location = {

    /**
     * The unique identification number.
     * @type {uuid}
     */
    id: {
        type: 'uuid',
        primary: true
    },

    /**
     * The name.
     * @type {string}
     */
    name: {
        type: 'string'
    },

    /**
     * The position of the location.
     * @type {point}
     */
    position: {
        type: 'point'
    },

    /**
     * Determines the roads going to other locations.
     * @type {relationship[]}
     */
    roadTo: {
        type: 'relationship',
        relationship: 'ROAD_TO',
        target: 'Location',
        properties: {
            length: 'float',
            speedLimit: 'int',
            directed: 'boolean'
        }
    },

    /**
     * Determines to which street this location belongs.
     * @type {relationship}
     */
    belongsTo: {
        type: 'relationship',
        relationship: 'BELONGS_TO',
        target: 'Street'
    }
};

module.exports = Location;