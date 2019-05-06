'use strict';

const repl = require('repl');
const logger = require('./logger');

class Prompt {

    static create(server) {
        let prompt = repl.start({
            prompt: '$ '
        });

        delete prompt.commands.save;
        delete prompt.commands.load;
        delete prompt.commands.break;
        delete prompt.commands.clear;
        delete prompt.commands.editor;

        prompt.defineCommand('list-routes', {
            help: 'Lists all routes.',
            action(name) {
                this.clearBufferedCommand();
                server.table().forEach(route => console.log(`${route.method}\t${route.path}`));
                this.displayPrompt();
            }
        });

        prompt.defineCommand('exit', {
            help: 'Exists the server.',
            action(name) {
                server.stop().then(() => {
                    logger.info('Manually stopped the server.');
                    process.exit(0);
                });
            }
        });

        return prompt;
    }
}

module.exports = Prompt;