'use strict';

const winston = require('winston');

let loggingLevels = {
    file: {
        human: process.env.LOGGING_LEVEL_FILE_HUMAN || 'info',
        machine: process.env.LOGGING_LEVEL_FILE_MACHINE || 'info'
    },
    console: process.env.LOGGING_LEVEL_CONSOLE || 'info'
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: loggingLevels.console,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.label({ label: '[TrafficNode]' }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({ 
            level: loggingLevels.file.human,
            filename: 'logs/human.log',
            format: winston.format.combine(
                winston.format.label({ label: '[TrafficNode]' }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({ 
            level: loggingLevels.file.machine,
            filename: 'logs/machine.log',
            format: winston.format.combine(
                winston.format.label({ label: '[TrafficNode]' }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json()
            )
        })
    ]
});

module.exports = logger;