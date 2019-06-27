'use strict';

const dotenv = require('dotenv');
const path = require('path');

const Setup = require('./bin/setup');
const EventSystem = require('./bin/event-system');

const Server = require('./server');
const Prompt = require('./prompt');

const logger = require('./logger');
const scheduler = require('./scheduler');

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

    logger.info("Setting up EventSystem.");

    // Creates the event system.
    let eventSystem = new EventSystem(process.env.EVENTSYSTEM_BROKER_HOST || 'localhost');

    // Sets up events after the event system has successfully connected to the broker.
    eventSystem.on('ready', async () => {

        logger.info(`EventSystem connected to: ${eventSystem.brokerHost}.`);

        // Publishes MOLECULE_STARTED event.
        eventSystem.client.publish('MOLECULE_STARTED', JSON.stringify(Object.assign(require('./config/molecule'), { timestamp: Date.now() })))

        // Dynamically loads events from a directory.
        await eventSystem.withDirectory(path.join(__dirname, 'app', 'events'));
    });
    
    // Listens to all errors occuring within the event system.
    eventSystem.on('error', (err) => {
        logger.error(`Event system error: ${err}.`);
    });

    // Makes the event system available.
    server.app.eventSystem = eventSystem;

    // Schedules tasks.
    scheduler.start();

    // Starts command prompt.
    Prompt.create(server);
});

// Logs all unhandled rejections during runtime.
process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${p}. Reason: ${reason}.`);
}); 