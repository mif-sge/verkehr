'use strict';

const Confidence = require('confidence');

/**
 * The manifest.
 * @see {@link https://github.com/hapijs/glue/blob/master/API.md}
 */
module.exports = new Confidence.Store({
    server: {
        host: {
            $env: 'SERVER_HOST',
            $default: '0.0.0.0'
        },
        port: {
            $env: 'SERVER_PORT',
            $coerce: 'number',
            $default: 8080
        },
        routes: {
            timeout: {
                server: {
                    $env: 'SERVER_TIMEOUT_GLOBAL',
                    $coerce: 'number',
                    $default: 30000
                }
            }
        }
    },
    register: {
        plugins: [
            
        ]
    }
});