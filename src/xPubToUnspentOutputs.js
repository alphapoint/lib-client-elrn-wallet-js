const axios = require('axios');
const memoize = require('memoizee');

const slowXpubToUnspentOutputs = function (xPubString, network) {
  if (!xPubString) { return Promise.reject(new Error('called xPubToUnspentOutputs without providing address')); }
  if (!network) { return Promise.reject(new Error('called xPubToUnspentOutputs without providing network (example "bitcoin")')); }
  return new Promise((resolve, reject) => {
      try {
          switch (network) {
              case 'bitcoin': {
                  const url = `https://blockchain.info/unspent?active=${xPubString}&cors=true`;
                  return axios.get(url)
                  .then(function (response) {
                    resolve(response.data.unspent_outputs);
                  });
              }
          default:
              reject(new Error(`called xPubToUnspentActivity with unknown network: ${network}`));
          }
      } catch (err) {
          reject(err);
      }
  });
};

const xPubToUnspentOutputs = memoize(slowXpubToUnspentOutputs, { promise: true });
export default xPubToUnspentOutputs;