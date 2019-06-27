/**
 * The schema of a Hospital
 */
let Hospital = {

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
     * The id of SmartCity Node.
     * @type {string}
     */
    SmartCityId: {
        type: 'string'
    },
    /**
     * The occupancy of this Location
     * @type {string}
     */
    occupancy: {
        type: 'string'
    },
    /**
     * Determines the position
     * @type {relationship}
     */
    locatesOn: {
        type: 'relationship',
        relationship: 'LOCATES_ON',
        target: 'Position',
        eager: true
    }

};

module.exports = Hospital;
