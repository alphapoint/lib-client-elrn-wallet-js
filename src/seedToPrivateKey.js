const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const isBuffer = require('is-buffer');

export default function seedToPrivateKey(seed, derivePathStr, network) {
    if (isBuffer(seed) !== true) Promise.reject(new Error('must call seedToPrivateKey with a buffer (see createSeed.js)'));
    if (!derivePathStr) Promise.reject(new Error('must call seedToPrivateKey with a derive path'));
    return new Promise((resolve, reject) => {
        try {
            const root = bip32.fromSeed(seed);
            const child = root.derivePath(derivePathStr);

            resolve(child.toWIF());
        } catch (err) {
            reject(err);
        }
    });
}
