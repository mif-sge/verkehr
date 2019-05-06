'use strict';

const World = require('./../../../lib/world');

module.exports = {
    handler: (request, h) => {

        let world = new World();
        let value = world.hello();

        return h.response(value).code(200);
    }
};