'use strict';

const repl = require('repl');
const logger = require('./logger');

/**
 * A command prompt.
 */
class Prompt {

    /**
     * Creates and configures a command prompt.
     * @param {Server} server The main application server.
     * @returns {REPLServer} A read-eval-print-loop instance.
     */
    static create(server) {

        // Starts the loop.
        let prompt = repl.start({
            prompt: '$ '
        });

        // Deletes pre-configured commands.
        delete prompt.commands.save;
        delete prompt.commands.load;
        delete prompt.commands.break;
        delete prompt.commands.clear;
        delete prompt.commands.editor;

        // Re-defines exit command.
        prompt.defineCommand('exit', {
            help: 'Exits the server.',
            action(name) {
                server.stop().then(() => {
                    logger.info('Manually stopped the server.');
                    process.exit(0);
                });
            }
        });

        // Defines command for listing all routes.
        prompt.defineCommand('list-routes', {
            help: 'Lists all routes.',
            action(name) {
                this.clearBufferedCommand();
                server.table().forEach(route => console.log(`${route.method}\t${route.path}`));
                this.displayPrompt();
            }
        });

        return prompt;
    }
};

module.exports = Prompt;