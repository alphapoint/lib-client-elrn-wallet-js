const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
//takes a extended account private key and an array of addressnumbers ex: m/0/'addressNumber'
//returns an array of private addressess
export default (xPrivKey, addressNumbers) => {
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
