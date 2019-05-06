'use strict';

const dotenv = require('dotenv');

const Setup = require('./setup');
const Server = require('./server');
const Prompt = require('./prompt');

const logger = require('./logger');

Setup.on(async () => {

    dotenv.config({ path: `${__dirname}/.env` });

    let server = await Server.deploy();
    logger.info(`Listening on ${server.info.uri}.`);

    server.events.on('log', (event, tags) => {

        if (tags.error) {
            logger.error(`Server error: ${event.error ? event.error.message : 'unknown'}.`);
        }
    });

    Prompt.create(server);
});

process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection at: ${p}. Reason: ${reason}.`);
}); 