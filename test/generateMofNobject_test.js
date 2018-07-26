/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;
//import seedToMnemonic from '../src/seedToMnemonic.js';
import Elrn from '..';

describe('generateMofNobject', function () { 
	it('can generate a P2SH, pay-to-multisig (2-of-3) address', function () {
		const config = require(__dirname + '/config/options.js');
        const elrnClient = new Elrn(config);
        //hybrid ocean else mirror stove candy february script object group tomato worry impose suffer science
		// addresses 3-5 of account 0 make this multisig address
		const pubkeys = [
			'03652aafbaf54a3e0d2e8a023010ec6d7294a707d650e6c2a5dfb8e1652f3cf899',
			'03ad886f6ccac6cd7e136c75169157eb3f4a7241d9e97fa474eed9ed3413ecc5d8',
			'03dfb4728fe6074ba18c2205a57e92220feca28f316ae3dcf7f669a94fe5fc233a'
		]
		const addressObject =  elrnClient.generateMofNobject(pubkeys, 2)	
		assert.equal(typeof addressObject, 'object');
		assert.strictEqual(addressObject.address, '3DWTeiAqVqiohZbHYDxggshSyNnZwKGbxt');
	})
})