
export default (inputs, accountPubKey) => {
  if (typeof inputs !== 'object') { return Promise.reject(new Error('You must call inputsToPaths with inputs, and the input must be an object')); }
  if (typeof accountPubKey !== 'string') { return Promise.reject(new Error('You must call inputsToPaths with a accountPubKey, and the accountPubKey must be a string')); }
  return new Promise((resolve, reject) => {
    try {
      const cumulativePaths = [];
      let newPath;
      Object.keys(inputs).map(inputTransaction => {
        Object.keys(inputs[inputTransaction]).map(inputn => {
          //make sure the accounts pubkey is the same as this unspentoutputs
          if (inputs[inputTransaction][inputn].xpub  && accountPubKey === inputs[inputTransaction][inputn].xpub.m) {
            //set the path as our own, split and slice it to remove the m/0 baggage, then add it to the array of paths
            newPath = inputs[inputTransaction][inputn].xpub.path; 
            const splitPath = newPath.split('/');
            const coinAddressIndex = splitPath.slice(-1)[0];
            const coinIndexInt = parseInt(coinAddressIndex);
            cumulativePaths.push(coinIndexInt);
          }
          return inputn;
        });
        return inputTransaction;
      });
      resolve(cumulativePaths);
    } catch (err) {
      reject(err);
    }
  });
};
