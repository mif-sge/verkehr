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
    }
};

module.exports = Bus_Line;
