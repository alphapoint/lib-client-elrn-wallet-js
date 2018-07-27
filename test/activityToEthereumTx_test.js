/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const isBuffer = require('is-buffer')
const assert = chai.assert;
const bufferFrom = require('buffer-from');
import Elrn from '..';

suite('activityToEthereumTx', function() {
    test('can create an ethereum transaction from the activity of an address', function() {
        const config = require(__dirname + '/config/options.js');
        const elrnClient = new Elrn(config)
        const destinationAddress = '0x6A5E5732809708AC71F03C8a4767af734cAa90A4';
        const sendAmount = 1200;
        const data = null;
        const activity = JSON.parse('{"address": "738d145faabb1e00cf5a017588a9c0f998318012","total_received": 9762206505909057760,"total_sent": 9742951942909057760,"balance": 19254563000000000,"unconfirmed_balance": 0,"final_balance": 19254563000000000,"n_tx": 704,"unconfirmed_n_tx": 0,"final_n_tx": 704,"nonce": 414,"pool_nonce": 414}');
        return elrnClient.activityToEthereumTx(activity, destinationAddress, sendAmount, data)
        .then((ethereumTransaction) => {
          assert.equal(typeof ethereumTransaction, 'object')
        })
    });
});
