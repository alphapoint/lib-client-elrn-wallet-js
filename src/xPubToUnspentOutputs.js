const axios = require('axios');
const promiseRetry = require('promise-retry');

export default (xPubString, network) => {
    if(!xPubString) {return Promise.reject(new Error('called xPubToUnspentOutputs without providing address'))}
    if(!xPubString) {return Promise.reject(new Error('called xPubToUnspentOutputs without providing network (example "bitcoin")'))}
    return new Promise((resolve, reject) => {
        try {
            switch (network) {
                case 'bitcoin':
                    const url = `https://blockchain.info/multiaddr?active=${xPubString}`
                    return axios.get(url)
                    .then(function(response) {
                        resolve(response.data);
                    })
            default:
                reject(new Error(`called xPubToUnspentOutputs with unknown network: ${network}`))
            }
        } catch (err) {
            reject(err);
        }
    });
}
