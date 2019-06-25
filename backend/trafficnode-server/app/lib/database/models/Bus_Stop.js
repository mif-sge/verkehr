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
    },
    /**
    * Determines the bus lines this bus stop serves
    * @type {relationships}
    */
   serves: {
       type: 'relationships',
       relationship: 'SERVES',
       target: 'Bus_Line',
       eager: true
   }

};

module.exports = Bus_Stop;
