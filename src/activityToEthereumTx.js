const Transaction = require('ethereumjs-tx');
export default (activity, destination , sendAmt, data) => {
    if (typeof activity !== 'object') { return Promise.reject(new Error('You must call activityToChangeAddress with activity, and activity must be an object')); }
    if (typeof destination !== 'string') { return Promise.reject(new Error('You must call activityToChangeAddress with destination, and destination must be a string')); }
    if (typeof sendAmt !== 'number') { return Promise.reject(new Error('You must call activityToChangeAddress with a send Amount, and it must be a number')); }
    
    return new Promise((resolve, reject) => {
        try {
          const gasPrice = 50;
          const gasLimit = 10000;
          var tx = new Transaction(null, 1)
          
          tx.nonce = 0;
          tx.gasPrice = gasPrice;
          tx.gasLimit = gasLimit;
          tx.value = sendAmt;
          if (data != null) {
            tx.to = destination;
          }else {
            tx.data = data;
          }
          resolve(tx);
        } catch (err) {
          reject(err);
        }
    });
};