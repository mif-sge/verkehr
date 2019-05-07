'use strict';

const Confidence = require('confidence');

/**
 * The manifest.
 * @see {@link https://github.com/hapijs/glue/blob/master/API.md}
 */
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 8080
        }
    },
    register: {
        plugins: [
            
        ]
    }
});