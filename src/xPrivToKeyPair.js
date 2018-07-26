const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
//takes a extended account private key and an array of addressnumbers ex: m/0/'addressNumber'
//returns an array of private addressess
export default (xPrivKey, addressNumbers) => {
	if (typeof xPrivKey !== 'string') { return Promise.reject(new Error('You must call xPrivToKeypair with a xPrivKey, and it must be a string')); }
  	if ( !Array.isArray(addressNumbers)) { return Promise.reject(new Error('You must call xPrivToKeypair with an array of addressNumbers')); }
  
	return new Promise((resolve, reject) => {
		try {
			const keypairs = [];
			addressNumbers.map(addressNumber => {
				const derivedNode = bip32.fromBase58(xPrivKey);
				const child = derivedNode.derive(0)
				.derive(addressNumber);

				keypairs.push(child);
				return addressNumber;
			});
			resolve(keypairs);
		} catch (err) {
			reject(err);
		}
	});
};
