'use strict';
const DataService = require('./../../../lib/dataService');
/**
 * Returns all lines.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {
    let data = new DataService();
    if(request.query.requestMode === 'short') {
      return data.getAllWithRelations('Bus_Line').then(result => {
          return h.response(result).code(200);
      }).catch(err => {
          console.log(err);
          return h.response(err).code(500);
      });
    }
    return data.getAllWithRelations('Bus_Line').then(result => {
        return h.response(result).code(200);
    }).catch(err => {
        console.log(err);
        return h.response(err).code(500);
    });
};

module.exports = {
    handler
};
