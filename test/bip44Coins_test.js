/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;
import Elrn from '..';

suite('bip44Coins', function() {
    test('bip44Coins returns object with all those cryptos', function() {
        const config = require(__dirname + '/config/options.js');
        const elrnClient = new Elrn(config)
        return assert.notEqual(elrnClient.getCoins, undefined)
    });
});