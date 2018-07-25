const bitcoin = require('bitcoinjs-lib');
const bufferFrom = require('buffer-from');

export default function generateMofNaddress(pubKeys, requiredSignatures ) {
  if (requiredSignatures > pubKeys.legnth ) {return Promise.reject(new Error('You can\'t require more signatures than are in the provided pubKey array'));}
  return new Promise((resolve, reject) => {
      try {
          const buffedPubkeys = pubKeys.map((hex) => Buffer.from(hex, 'hex'))
          const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({m: requiredSignatures, pubkeys:buffedPubkeys})
          })
          resolve(address);
      } catch (err) {
          reject(err);
      }
  });
}
