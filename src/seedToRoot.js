const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

export default seed => {
    return new Promise((resolve, reject) => {
        try {
            const rootNode = bip32.fromSeed(seed);
            resolve(rootNode); 
        } catch (err) {
            reject(err);
        }
    });
};
