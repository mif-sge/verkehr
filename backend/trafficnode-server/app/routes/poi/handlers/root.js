'use strict';
const DataService = require('./../../../lib/dataService');

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
    } 
};

module.exports = {
    handler
};
