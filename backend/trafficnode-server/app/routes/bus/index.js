'use strict';

const Boom = require('@hapi/boom');

/**
 * The main plugin.
 */
let plugin = {

    /**
     * The name of the plugin.
     * @type {string}
     */
    name: 'Bus',

    /**
     * The version of the plugin.
     * @type {string}
     */
    version: require('./../../../package.json').version,
    
    /**
     * Registers all routes.
     * @param {Server} server The main application server.
     * @param {RegisterOptions} options All options passed during registration.
     */
    register: async (server, options) => {

        server.route([
            {
                method: 'GET',
                path: '/stops',
                options: require('./handlers/stops')
            },
            {
                method: 'GET',
                path: '/lines',
                options: require('./handlers/lines')
            },
            {
                method: 'GET',
                path: '/{any*}',
                options: {
                    handler: (request, h) => {
                        return Boom.notFound();
                    }
                }
            }
        ]);
    }
};

module.exports = {
    plugin,
    routes: {
        prefix: '/api/bus'
    }
};