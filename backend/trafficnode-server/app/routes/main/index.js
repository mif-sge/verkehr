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
    name: 'Main routes',

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
                path: '/',
                options: require('./handlers/root')
            },
            {
                method: 'GET',
                path: '/demo',
                options: require('./handlers/demo')
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
        prefix: '/api'
    }
};