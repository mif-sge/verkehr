'use strict';

const Boom = require('@hapi/Boom');

let plugin = {
    name: 'Main routes',
    version: require('./../../../package.json').version,
    register: async (server, options) => {

        server.route([
            {
                method: 'GET',
                path: '/',
                options: require('./handlers/root')
            },
            {
                method: 'GET',
                path: '/{any*}',
                options: {
                    handler: (request, h) => {
                        return Boom.notFound()
                    }
                }
            }
        ])
    }
};

module.exports = {
    plugin,
    routes: {
        prefix: '/api'
    }
};