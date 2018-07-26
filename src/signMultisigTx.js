const bitcoin = require('bitcoinjs-lib');
//takes an unsigned transaction and an array of keypairs sourced from all of the unspent outputs
export default (transaction, keypair, MofNobject) => {
    if (typeof MofNobject != 'object' ) {return Promise.reject(new Error('You must call signMultisigTx with a MofN address object from generateMofNobject()'));}
    if (typeof keypair != 'object' ) {return Promise.reject(new Error('You must call signMultisigTx with a keypair object from xPrivToKeypair()'));}
    if (typeof transaction != 'object' ) {return Promise.reject(new Error('You must call signMultisigTx with a transaction object from prepareTransaction()'));}
    
    return new Promise((resolve, reject) => {
       try {
        let wiffedSig = keypair.toWIF()
        let signature = bitcoin.ECPair.fromWIF(wiffedSig)
        transaction.sign(0, signature, MofNobject.redeem.output);
        
        resolve(transaction);
      } catch (err) {
        reject(err);
      }
    });
};
