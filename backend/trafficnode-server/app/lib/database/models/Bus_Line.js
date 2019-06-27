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
     * Determines the bus stops this bus line serves
     * @type {relationships}
     */
    serves: {
        type: 'relationships',
        relationship: 'SERVES',
        target: 'Bus_Stop',
        eager: true
    },
    /**
     * Determines the positions on the route of this bus line
     * @type {relationships}
     */
    viaPosition: {
        type: 'relationships',
        relationship: 'VIA',
        target: 'Position',
        eager: true
    },
    /**
     * Determines the streets on the route of this bus line
     * @type {relationships}
     */
    viaStreet: {
        type: 'relationships',
        relationship: 'VIA',
        target: 'Street',
        eager: true
    },

};

module.exports = Bus_Line;
