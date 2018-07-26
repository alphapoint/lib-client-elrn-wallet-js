
export default (activity, unspentChecker) => {
    if (typeof activity !== 'object') { return Promise.reject(new Error('You must call activityToUnspentOutputs with activity, and activity must be an object')); }
    if (typeof unspentChecker !== 'object') { return Promise.reject(new Error('You must call activityToUnspentOutputs with unspentChecker, and unspentChecker must be an object')); }
    
    return new Promise((resolve, reject) => {
        try {
          function unspentOutputMatcher(outputScript) {   
            for (var i = unspentChecker.length - 1; i >= 0; i--) {
              if (unspentChecker[i].script === outputScript) {
                return true
              }
            }
            return false
          }

          const unspentOutputs = {};
          activity.txs.map(transaction => {

            return transaction.out.map(output => {
              if (output.spent === false && unspentOutputMatcher(output.script) === true) {
                unspentOutputs[`${transaction.hash}`] = unspentOutputs[`${transaction.hash}`] || {};
                unspentOutputs[`${transaction.hash}`][`${output.n}`] = output;
              }
              return output;
            });
          });
          resolve(unspentOutputs);
        } catch (err) {
            reject(err);
        }
    });
};
