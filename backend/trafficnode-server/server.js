'use strict';

const path = require('path');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const PluginCollector = require('./bin/plugin-collector');

/**
 * The server.
 */
class Server {

    /**
     * Deploys a ready-to-use server instance based on dynamically loaded plugins.
     * @returns {Server} The main application server.
     */
    static async deploy() {

        let manifest = Manifest.get('/');

        // Collects all plugins from '/app/routes'.
        let pluginCollector = new PluginCollector();
        let plugins = await pluginCollector.collect(path.join('app', 'routes'));

        // Registers all plugins.
        for(var plugin of plugins) {
            manifest.register.plugins.push(plugin);
        }

        // Composes the server using the manifest.
        let server = await Glue.compose(manifest, { relativeTo: __dirname });

        await server.initialize();
        await server.start();

        return server;
    }
};

module.exports = Server;