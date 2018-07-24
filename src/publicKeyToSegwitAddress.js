const bitcoin = require('bitcoinjs-lib');
const networksExtensions = require('./networksExtensions.js');
const isBuffer = require('is-buffer');

export default function publicKeyToSegwitAddress(pubKey, derivePath) {
    if (isBuffer(pubKey) !== true) Promise.reject(new Error('must call publicKeyToSegwitAddress with a buffer (see seedToPublicKey.js)'));
    return new Promise((resolve, reject) => {
        try {
          const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: pubKey })
          })   
          resolve(address);
        } catch (err) {
            reject(err);
        }
    });
}
