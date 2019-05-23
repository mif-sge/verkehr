const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const mqtt = require('mqtt');

/**
 * A system listening to remotly published events.
 */
class EventSystem extends EventEmitter {

    /**
     * Constructs an instance of @see {EventSystem}.
     * @param {string} brokerHost The URL of the broker to connect with.
     */
    constructor(brokerHost) {
        super();

        if(!brokerHost) {
            throw "[EventSystem::ctor] Missing parameter 'brokerHost'.";
        }

        /**
         * The URL of the broker the event system is connected with.
         * @type {string}
         */
        this.brokerHost = brokerHost;

        /**
         * The mqtt client.
         * @type {MqttClient}
         */
        this.client = mqtt.connect(brokerHost);

        /**
         * All event subscriptions.
         * @type {Map<string, List<EventSubscription>>}
         */
        this._events = {};

        this.client.on('connect', (connack) => {
            if (!connack.sessionPresent) {
                this.emit('ready');
            }
        });

        this._onMessage();
        this._onError();
    }

    /**
     * Sets up the mechanism for distributing messages to dynamically loaded event listeners.
     * @private
     */
    _onMessage() {
        this.client.on('message', (topic, payload, packet) => {

            this.emit('message', topic, payload, packet);

            if (!this._events[topic]) {
                return;
            }

            for (var sub of this._events[topic]) {
                sub.onMessage(payload, this);
            }
        });
    }

    /**
     * Sets up the forwarder for error messages.
     * @private
     */
    _onError() {
        this.client.on('error', (error) => {
            this.emit('error', error);
        });
    }

    /**
     * Loads an event from a file.
     * @param {string} file The file path.
     * @returns {Promise<EventSystem>} A promise to the instance of the event system.
     */
    withFile(file) {
        return new Promise((resolve, reject) => {

            fs.stat(file, (err, stats) => {
                if (err) {
                    reject(err.message);
                    return;
                }

                if (!stats.isFile()) {
                    reject("Not a file");
                    return;
                }

                let event = require(file);

                if (!event) {
                    reject("Event is undefined");
                    return;
                }

                if (!event.topic) {
                    reject("Event has no topic");
                    return;
                }

                this.client.subscribe(event.topic);

                if (!this._events[event.topic]) {
                    this._events[event.topic] = [];
                }

                this._events[event.topic].push({
                    topic: event.topic,
                    onMessage: event.onMessage || (() => { }),
                    onError: event.onError || (() => { })
                });

                resolve(this);
            });
        });
    }

    /**
     * Loads events from a directory.
     * @param {string} file The directory path.
     * @returns {Promise<EventSystem>} A promise to the instance of the event system.
     */
    withDirectory(directory) {
        return new Promise((resolve, reject) => {

            fs.stat(directory, (err, stats) => {
                if (err) {
                    reject(err.message);
                    return;
                }

                if (!stats.isDirectory()) {
                    reject("Not a directory");
                    return;
                }

                fs.readdir(directory, async (err, files) => {

                    if (err) {
                        reject(err.message);
                        return;
                    }

                    for (var file of files) {
                        await this.withFile(path.join(directory, file));
                    }

                    resolve(this);
                });
            });
        });
    }
};

module.exports = EventSystem;