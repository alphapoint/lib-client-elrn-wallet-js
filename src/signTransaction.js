const bitcoin = require('bitcoinjs-lib');
//takes an unsigned transaction and an array of keypairs sourced from all of the unspent outputs
export default (transaction, keypairs) => {
    return new Promise((resolve, reject) => {
       try {
        if (!Array.isArray(keypairs)) Promise.reject(new Error('Must call sign transaction with an array of keypairs'));
        if (typeof transaction !== 'object') { return Promise.reject(new Error('You must call sign transaction with a transaction, and it must be a object')); }
        
        for (let i = 0; i < keypairs.length; i++) {
          let wiffedSig = keypairs[i].toWIF()
          let signature = bitcoin.ECPair.fromWIF(wiffedSig)
          transaction.sign(i, signature);
        }
        resolve(transaction);
      } catch (err) {
        reject(err);
      }
    });
};
