export default (unspentOutputs, sendAmount) => {
  return new Promise((resolve, reject) => {
  if (typeof unspentOutputs !== 'object') { return Promise.reject(new Error('You must call unspentOutputsToInputs with unspentOutputs, and it must be a object')); }
  if (typeof sendAmount !== 'number') { return Promise.reject(new Error('You must call unspentOutputsToInputs with a sendAmount, and sendAmount must be a number')); }

    try {
      let cumulativeValue = 0;
      const inputs = {};
      Object.keys(unspentOutputs).map(unspentOutputTransaction => {
        Object.keys(unspentOutputs[unspentOutputTransaction]).map(unspentOutput => {
          inputs[unspentOutputTransaction] = inputs[unspentOutputTransaction] || {};
          inputs[unspentOutputTransaction][unspentOutput] = Object.assign(unspentOutputs[unspentOutputTransaction][unspentOutput]);
          cumulativeValue += unspentOutputs[unspentOutputTransaction][unspentOutput].value;
          if (cumulativeValue > sendAmount) {
            resolve(inputs);
          }
          return unspentOutput;
        });
        return unspentOutputTransaction;
      });
      reject(new Error('not enough funds to cover sendAmount'));
    } catch (err) {
        reject(err);
    }
  });
};
