const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

export default (xPubKey, addressNumber) => {
    try {
        const derivedNode = bip32.fromBase58(xPubKey);
        const address = derivedNode.derive(0)
            .derive(addressNumber);

		
		return bitcoin.payments.p2pkh({ pubkey: address.publicKey }).address.toString()
      } catch (err) {
        console.log(err);
     }
};
