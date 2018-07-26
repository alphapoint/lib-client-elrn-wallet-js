const bitcoin = require('bitcoinjs-lib');

export default (inputs, receiveAddress, changeAddress, sendAmt, feeAmount) => {
  if (typeof inputs !== 'object') { return Promise.reject(new Error('You must call inputsToUnsignedTx with inputs, and the input must be an object')); }
  if (typeof receiveAddress !== 'string') { return Promise.reject(new Error('You must call inputsToUnsignedTx with a destination address, and it must be a string')); }
  if (typeof changeAddress !== 'string') { return Promise.reject(new Error('You must call inputsToUnsignedTx with a change address, and it must be a string')); }
  if (typeof sendAmt !== 'number') { return Promise.reject(new Error('You must call inputsToUnsignedTx with a sendAmount, and it must be a number')); }
  if (typeof feeAmount !== 'number') { return Promise.reject(new Error('You must call inputsToUnsignedTx with a feeAmount, and it must be a number')); }
  
  return new Promise((resolve, reject) => {
    try {
      const sendAmount = parseInt(sendAmt);
      const txb = new bitcoin.TransactionBuilder();
      txb.setVersion(1);
      let cumulativeOutputAmount = 0;

      Object.keys(inputs).map(inputTransaction => {
        Object.keys(inputs[inputTransaction]).map(inputn => {
          cumulativeOutputAmount += inputs[inputTransaction][inputn].value;
          txb.addInput(inputTransaction, parseInt(inputn)); // aka previous transaction output,
          return inputn;
        });
        return inputTransaction;
      });
      const changeAmount = cumulativeOutputAmount - sendAmount - feeAmount;
      txb.addOutput(receiveAddress, sendAmount);
      //only if there's change, add a change address
      if (changeAmount > 0 && changeAddress != null){
        txb.addOutput(changeAddress, changeAmount);
      }
      
      resolve(txb);
    } catch (err) {
      reject(err);
    }
  });
};
