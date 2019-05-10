const Lab = require('@hapi/lab');
const { expect, fail } = require('@hapi/code');

// Setup lab.
const { describe, it } = exports.lab = Lab.script();

const World = require('./../app/lib/world');

describe('example', () => {

    it('should return the string "Hello World!"', () => {

        let world = new World();
        let value = world.hello();

        expect(value).to.equal("Hello World!");
    });
});