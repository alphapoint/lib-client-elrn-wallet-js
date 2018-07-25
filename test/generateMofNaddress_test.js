/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;
//import seedToMnemonic from '../src/seedToMnemonic.js';
import Elrn from '..';

describe('generateMofNaddress', function () { 
	it('can generate a P2SH, pay-to-multisig (2-of-3) address', function () {
		const config = require(__dirname + '/config/options.js');
        const elrnClient = new Elrn(config);
		const pubkeys = [
			'026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
			'02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
			'03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
		]
		return elrnClient.generateMofNaddress(pubkeys, 2)
		.then((multiAddress) => {
			assert.strictEqual(multiAddress, '36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7')
		})
	})
})