const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
export default (activity, xPubKey, elrnClient) => {
    if (!activity) { return Promise.reject(new Error('called activityToChangeAddress without activity')); }
    return new Promise((resolve, reject) => {
        try {
          const changeAddressIndex = activity.addresses[0].n_tx;

          const derivedNode = bip32.fromBase58(xPubKey);
          const addressNode = derivedNode.derive(1)
            .derive(changeAddressIndex);
        
          const address = bitcoin.payments.p2pkh({ pubkey: addressNode.publicKey }).address
          resolve(address);
        } catch (err) {
            reject(err);
        }
    });
};
