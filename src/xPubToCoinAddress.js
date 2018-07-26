const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

export default (xPubKey, addressNumber) => {
	if (typeof xPubKey !== 'string') { return Promise.reject(new Error('You must call xPubToCoinAddress with a xPubKey, and it must be a string')); }
  	if ( typeof addressNumber !== 'number') { return Promise.reject(new Error('You must call xPubToCoinAddress with an addressNumber, and as you might of guessed, it has to be a number')); }
    try {
        const derivedNode = bip32.fromBase58(xPubKey);
        const address = derivedNode.derive(0)
            .derive(addressNumber);

		return bitcoin.payments.p2pkh({ pubkey: address.publicKey }).address.toString()
      } catch (err) {
        console.log(err);
     }
};
