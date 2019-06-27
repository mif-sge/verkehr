const logger = require('./../../logger');

const moment = require('moment');

const dateFormat = "DD.MM.YYYY";

module.exports = {

    /**
     * The topic.
     * @type {string}
     */
    topic: 'REQUEST_COSTS',

    /**
     * The callback for handling errors.
     * @type {function}
     */
    onError: (err, eventSystem) => {
        logger.error(err.message);
    },

    /**
     * The callback for handling messages.
     * @type {function}
     */
    onMessage: (payload, eventSystem) => {
        let json = JSON.parse(payload.toString());

        let dates = {
            begin: moment(json.begin, dateFormat),
            end: moment(json.end, dateFormat)
        };

        let months = [];

        while(dates.begin.isBefore(dates.end)) {
            months.push(dates.begin.format(dateFormat));
            dates.begin.add(1, 'month');
        }

        let costs = {};

        months.forEach(value => {
            costs[value] = Math.floor(Math.random() * 10000 + 5000);
        });

        eventSystem.client.publish('COSTS_REQUESTED', JSON.stringify({
            id: 'traffic',
            values: costs
        }));
    }
};