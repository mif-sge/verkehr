'use strict';

const dotenv = require('dotenv');

const Setup = require('./bin/setup');

const Server = require('./server');
const Prompt = require('./prompt');

const logger = require('./logger');

// Configures and starts the server.
Setup.main(async () => {

    // Loads environment variables from '.env' file.
    dotenv.config({ path: `${__dirname}/.env` });

    let server = await Server.deploy();
    logger.info(`Listening on ${server.info.uri}.`);

    // Listens to all incoming server events.
    server.events.on('log', (event, tags) => {

        if (tags.error) {
            logger.error(`Server error: ${event.error ? event.error.message : 'unknown'}.`);
        }
    });

    // Starts command prompt.
    Prompt.create(server);
});

// Logs all unhandled rejections during runtime.
process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${p}. Reason: ${reason}.`);
}); 