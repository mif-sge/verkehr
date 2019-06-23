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
    }
    
};

module.exports = Street;
