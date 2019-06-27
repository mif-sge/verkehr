'use strict';
const DataService = require('./../../../lib/dataService');
/*
const pois = {
    hospitals: [
        {
            id: 1,
            name: 'Krankenhaus 1',
            lat: 10,
            lon: 10
        },
        {
            id: 2,
            name: 'Krankenhaus 2',
            lat: 11,
            lon: 11
        }
    ],
    malls: [
        {
            id: 1,
            name: 'Einkaufszentrum 1',
            lat: 20,
            lon: 20
        },
        {
            id: 2,
            name: 'Einkaufszentrum 2',
            lat: 21,
            lon: 21
        }
    ]
};
*/
/**
 * Returns POIs.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {
    let data = new DataService();
    if(!request.query.types) {
      let allPois=[];
      return data.getAllWithRelations('Hospital').then(result => {
        allPois.push(result);
        console.log("--Hospital");
        return data.getAllWithRelations('Shop');
      }).then(result => {
        allPois.push(result);
          console.log("--Shop");
        return data.getAllWithRelations('School');
      }).then(result => {
        allPois.push(result);
        console.log("--School");
        return  allPois;
      }).then(result => {
        console.log("--return");
        return h.response(result).code(200);
      })
      .catch(err => {
          console.log(err);
          return h.response(err).code(500);
      });
    } /*else {
      let result = {};

      for(var type of request.query.types.split(',')) {
          if(pois[type]) {
              result[type] = pois[type];
          }
      }

      return h.response(result).code(200);
    }*/
};

module.exports = {
    handler
};
