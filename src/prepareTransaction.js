import Elrn from '..'

export default function prepareTransaction( destinationAddress , sendAmount , accountInfo , address ) {
    if (typeof accountInfo != 'object') { return Promise.reject(new Error('prepareTransaction must be called with accountInfo, which must be an object')); }
    if (typeof sendAmount != 'number') { return Promise.reject(new Error('prepareTransaction must be called with a sendAmount, which must be a number')); }
    if (typeof address != 'string') { return Promise.reject(new Error('prepareTransaction must be called with a sender-address, which must be a string ')); }
    if (typeof destinationAddress != 'string') { return Promise.reject(new Error('prepareTransaction must be called with a destination-address, which must be a string ')); }
    if (!accountInfo.unspentOutputs || !accountInfo.activity) { return Promise.reject(new Error('prepareTransaction must be called with accountInfo, which must contain at the very least: account activity and unspentOutputs for the specified address')); }
    
    return new Promise((resolve, reject) => {
        try {
            const config = {}
            let elrnClient = new Elrn(config)
            //the address must/should be an xpub
            var bitcoinTransactionPrep = async function() {
                const feeAmount = 1000
                let changeAddress = null;
                const activity = accountInfo.activity;
                const unspentOutputsChecker = accountInfo.unspentOutputs;
                //if a change address is needed, access the MofN change address stored on the account
                //this eyesore if statement is needed to prevent this whole function being written twice just for multisig
                if (sendAmount + feeAmount < activity.wallet.final_balance) {
                    if (accountInfo.network === 'bitcoin-multisig') {
                        changeAddress = accountInfo.MofNchangeAddress
                    }
                    else{
                        changeAddress = await elrnClient.activityToChangeAddress(activity, address, elrnClient)
                    }  
                }
                let unspentOutputs = await elrnClient.activityToUnspentOutputs(activity, unspentOutputsChecker)
                let inputs = await elrnClient.unspentOutputsToInputs(unspentOutputs, sendAmount)
                let unsignedTransaction = await elrnClient.inputsToUnsignedTransaction(inputs, destinationAddress , changeAddress, sendAmount , feeAmount)
                
                const transactionPackage = {
                    preparedTransaction : unsignedTransaction,
                    inputPaths: null,
                    inputs: inputs
                }
                return transactionPackage;
            } 
            var ethereumTransactionPrep = async function(){
                let address = await elrnClient.xPrvToEthereumAddress(address, 'm/44\'/0\'/0')
                let activity = await elrnClient.xPubToActivity(address, 'ethereum')
            }

            switch (accountInfo.network) {
            //ethereum requires an address not an xpub!!!!!~~~~~~~~~~~~~~~~~~~~   
                case 'ethereum': {
                    ethereumTransactionPrep();
                }
            //multisig prep needs to be called with a multisig address in place of a xpub
                case 'bitcoin-multisig':{
                    return bitcoinTransactionPrep()
                    .then((transactionPack) => {
                        resolve(transactionPack);
                    })
                }    
            default:
                return bitcoinTransactionPrep()
                .then((transactionPack) => {
                    return elrnClient.inputsToPaths(transactionPack.inputs, address)
                    .then((paths) => {
                        transactionPack.inputPaths = paths;
                        resolve(transactionPack);
                    })
                })
            }
        } catch (err) {
            reject(err);
        }
    });
}