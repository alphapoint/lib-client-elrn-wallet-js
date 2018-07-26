const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
export default (activity, xPubKey, elrnClient) => {
    if (typeof activity !== 'object') { return Promise.reject(new Error('You must call activityToChangeAddress with activity, and activity must be an object')); }
    if (typeof xPubKey !== 'string') { return Promise.reject(new Error('You must call activityToChangeAddress with xPubKey, and xPubKey must be a string')); }
    if (typeof elrnClient !== 'object') { return Promise.reject(new Error('You must call activityToChangeAddress with an instance of elrnClient')); }
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
