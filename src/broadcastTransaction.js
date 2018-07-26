const axios = require('axios');
//takes an unsigned transaction and an array of privatekeys sourced from all of the unspent outputs
export default transaction => {
    if (typeof transaction !== 'object') { return Promise.reject(new Error('You must call broadcastTransaction with a transaction, and the transaction must be an object')); }
    return new Promise((resolve, reject) => {
       try {
        const hexxedTx = transaction.build().toHex();
        const url = 'https://www.blockchain.com/en/btc/pushtx?cors=true';

        axios({
          method: 'post',
          url : url,
          data: {
            tx: hexxedTx
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function (response) {
            resolve(response.data);
        });
      } catch (err) {
          reject(err);
        }
      });
};
