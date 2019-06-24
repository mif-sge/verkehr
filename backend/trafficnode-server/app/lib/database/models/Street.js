/**
 * The schema of a street.
 */
let Street = {

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
        type: 'integer'
    },
    maxspeed: {
        type: 'integer'
    },
    /**
     * Determines the positions connected woth this street
     * @type {relationships}
     */
    connects: {
        type: 'relationships',
        relationship: 'CONNECTS',
        target: 'Position',
        eager: true
    }

};

module.exports = Street;
