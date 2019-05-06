'use strict';

class Setup {

    static async on(handler) {
        await handler();
    }
}

module.exports = Setup;