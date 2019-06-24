/**
 * The schema of a Busstop
 */
let Bus_Stop = {

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

module.exports = Bus_Stop;
