const axios = require('axios');
const promiseRetry = require('promise-retry');
var memoize = require('memoizee');

const slow_xPubToActivity = function(xPubString, network) {
  if(!xPubString) {return Promise.reject(new Error('called xPubToUnspentOutputs without providing address'))}
  if(!network) {return Promise.reject(new Error('called xPubToUnspentOutputs without providing network (example "bitcoin")'))}
  return new Promise((resolve, reject) => {
      try {
          switch (network) {
              case 'bitcoin':
                  const url = `https://blockchain.info/multiaddr?active=${xPubString}&cors=true`
                  return axios.get(url)
                  .then(function(response) {
                    resolve(response.data);
                  })
          default:
              reject(new Error(`called xPubToUnspentActivity with unknown network: ${network}`))
          }
      } catch (err) {
          reject(err);
      }
  })
}

const xPubToActivity = memoize(slow_xPubToActivity, { promise: true });
export default xPubToActivity
