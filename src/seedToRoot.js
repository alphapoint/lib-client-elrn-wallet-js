const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const isBuffer = require('is-buffer');

export default seed => {
    if (isBuffer(seed) !== true) Promise.reject(new Error('must call seedToPublicKey with a buffer (see createSeed.js)'));
    return new Promise((resolve, reject) => {
        try {
            const rootNode = bip32.fromSeed(seed);
            resolve(rootNode); 
        } catch (err) {
            reject(err);
        }
    });
};
