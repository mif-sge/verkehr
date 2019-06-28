'use strict';
const DataFassade = require('./../../../lib/dataFassade');

/**
 * Returns POIs.
 * @param {Request} request The request object.
 * @param {ResponseToolkit} h The response toolkit.
 * @returns {Response} The response object.
 */
let handler = (request, h) => {
    let data = new DataFassade();
    if(!request.query.types) {
      return data.getAllPoI().then(result => {
        return h.response(result).code(200);
      }).catch(err => {
          return h.response(err).code(500);
      });
    }
};

module.exports = {
    handler
};
