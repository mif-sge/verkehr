'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const PluginCollector = require('./bin/plugin-collector');

class Server {

    static async deploy() {

        let manifest = Manifest.get('/');

        let pluginCollector = new PluginCollector();
        let plugins = await pluginCollector.collect('.\\app\\routes');

        for(var plugin of plugins) {
            manifest.register.plugins.push(plugin);
        }

        let server = await Glue.compose(manifest, { relativeTo: __dirname });

        await server.initialize();
        await server.start();

        return server;
    }
}

module.exports = Server;