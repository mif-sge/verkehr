/**
 * The schema of a Busstop
 */
let Bus_Line = {

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
    from: {
        type: 'string'
    },
    to: {
        type: 'string'
    },
    number: {
        type: 'string'
    },
    note: {
        type: 'string'
    },
    via: {
        type: 'string'
    },
    /**
     * Determines the bus stops of this bus line
     * @type {relationships}
     */
    stopsOn: {
        type: 'relationships',
        relationship: 'STOPS_ON',
        target: 'Bus_Stop'
    },
    /**
     * Determines the positions on the route of this bus line
     * @type {relationships}
     */
    viaPosition: {
        type: 'relationships',
        relationship: 'VIA',
        target: 'Position'
    },
    /**
     * Determines the streets on the route of this bus line
     * @type {relationships}
     */
    viaStreet: {
        type: 'relationships',
        relationship: 'VIA',
        target: 'Street'
    },

};

module.exports = Bus_Line;
