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
        type: 'string',
        index: true
    }
};

module.exports = Street;