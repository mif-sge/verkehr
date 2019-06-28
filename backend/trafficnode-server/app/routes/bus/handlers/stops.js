'use strict';
const DataFassade = require('./../../../lib/dataFassade');
/**
 * Returns all stops.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {
    let data = new DataFassade();
    if(request.query.requestMode === 'short') {
      return data.getPoIByLabel('Bus_Stop').then(result => {
          return h.response(result).code(200);
      }).catch(err => {
          return h.response(err).code(500);
      });
    }
  return data.getPoIByLabel('Bus_Stop').then(result => {
        return h.response(result).code(200);
    }).catch(err => {
        console.log(err);
        return h.response(err).code(500);
    });
};

module.exports = {
    handler
};
