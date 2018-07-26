const bitcoin = require('bitcoinjs-lib');
const isBuffer = require('is-buffer');
const bip32 = require('bip32');

export default function seedToXpub(seed, derivePathStr, network) {
    if (isBuffer(seed) !== true) Promise.reject(new Error('must call seedToXpub with a buffer (see createSeed.js)'));
    if (typeof derivePathStr !== 'string') { return Promise.reject(new Error('You must call seedToXpub see with a derivePath, and it must be a string')); }
    if (typeof network !== 'string') { return Promise.reject(new Error('You must call seedToXpub with a coin-network, and it must be a string')); }
    return new Promise((resolve, reject) => {
        try {
            const root = bip32.fromSeed(seed);
            const xpubString = root.derivePath(derivePathStr).neutered().toBase58();
            resolve(xpubString);
        } catch (err) {
            reject(err);
        }
    });
}
