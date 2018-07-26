const bitcoin = require('bitcoinjs-lib');
const bufferFrom = require('buffer-from');

export default function generateMofNaddress(pubKeys, requiredSignatures ) {
  if (requiredSignatures > pubKeys.length ) {return Promise.reject(new Error('You can\'t require more signatures than are in the provided pubKey array'));}
  if (typeof requiredSignatures !== 'number') { return Promise.reject(new Error('You must call generateMofNaddress with a required amount of signatures')); }
  if (!Array.isArray(pubKeys) ) {return Promise.reject(new Error('You must call generateMofNaddress with a pubkey array'));}
  
      try {
          const buffedPubkeys = pubKeys.map((hex) => Buffer.from(hex, 'hex'))
          const multisig = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({m: requiredSignatures, pubkeys:buffedPubkeys})
          })
          return multisig;
      } catch (err) {
          return Promise.reject(err);
        }
}
