'use strict';

/**
 * A simple setup.
 */
class Setup {

    /**
     * Executes an async main handler. 
     * @param {(AsyncFunction|Promise<any>)} handler The main handler.
     */
    static async main(handler) {
        if(!handler) {
            throw "[Setup::main] Missing parameter 'handler'.";
        }

        await handler();
    }
};

module.exports = Setup;