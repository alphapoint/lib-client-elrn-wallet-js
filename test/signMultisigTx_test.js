/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;
import Elrn from '..';

const config = require(__dirname + '/config/options.js');
const elrnClient = new Elrn(config);
//hybrid ocean else mirror stove candy february script object group tomato worry impose suffer science
//first three addresses of account 0 make this multisig address
const pubkeys = [
      '03142774f7ec5cea1f82be9fee6e0148a453cfb992ca35b431cf9ec4dd5b1f098b',
      '024871cd57d87e0f0aee8353866165a0b4f80140bf866c7a6409506fff78ed2eaf',
      '0376829529e098615f178eed42fcdc3b2db34f16746dd5424470ba4050dbb916ce']
const MofNObject = elrnClient.generateMofNobject(pubkeys, 2)
const currentAddress = MofNObject.address

const xPriv = 'xprv9y3MwXJuGGvd2w8atqjQAVFAmAFHFzgyHGyby27xbatLVg6EPy66faMFg18vdKkTKnjF19WsYYL4YgpFqYJxiqtCUo2GgHPiT7Fmwg2bsBv'
const sendAmount = 2000;
//both activity and outputschecker is from api calls using 3EAX2k5CioUwvn5suf1Uoc91amqWxcoSCi
const activity = JSON.parse('{"recommend_include_fee":true,"info":{"nconnected":0,"conversion":100000000.00000000,"symbol_local":{"code":"USD","symbol":"$","name":"U.S. dollar","conversion":12132.68302152,"symbolAppearsAfter":false,"local":true},"symbol_btc":{"code":"BTC","symbol":"BTC","name":"Bitcoin","conversion":100000000.00000000,"symbolAppearsAfter":true,"local":false},"latest_block":{"block_index":1712410,"hash":"0000000000000000000157c2f40bf4623d3c2f6a27f452f9b8b74f539a3e6468","height":533804,"time":1532626571}},"wallet":{"n_tx":1,"n_tx_filtered":1,"total_received":10000,"total_sent":0,"final_balance":10000},"addresses":[{"address":"3EAX2k5CioUwvn5suf1Uoc91amqWxcoSCi","n_tx":1,"total_received":10000,"total_sent":0,"final_balance":10000,"change_index":0,"account_index":0}],"txs":[{"hash":"2039919e2e34cd00392ea84583291e906f632660f7561d80de2eb442ebddbaca","ver":1,"vin_sz":2,"vout_sz":2,"size":371,"weight":1484,"fee":1000,"relayed_by":"0.0.0.0","lock_time":0,"tx_index":362720924,"double_spend":false,"result":10000,"balance":10000,"time":1532555625,"block_height":533664,"inputs":[{"prev_out":{"value":1000,"tx_index":359932111,"n":0,"spent":true,"script":"76a9149e0901d835508c3b8d94456a133c4f57afb9c40488ac","type":0,"addr":"1FQcZ9AfYAGasWVHXYP7Nd4n2pDSdiwkWy"},"sequence":4294967295,"script":"483045022100ee0b962827787e18966457a856cfa9cdedcf980264a10c3da63a2a1e4190529b02204f3a4bb86b3352e4aedde189608dbe7d3eb5db94c0505a0508364a16f70b4aaf012102ca94c8162f8dae4e213af19b298875adbcbc5b497388c6cc292e8784043626c0","witness":""},{"prev_out":{"value":98000,"tx_index":359932111,"n":1,"spent":true,"script":"76a9141e3281992ef0d9f60c18d8e830d8b68f2151c69888ac","type":0,"addr":"13kfmzSB5a1uAxiXdXJnG5B6Yoik7sJAts"},"sequence":4294967295,"script":"473044022009332c6b5e6152f9ffbbe7e44100b31a01cd1311488c5c2a2929763682d811c302205ba698fd4ea25ecb16e7972011659a1b4ae7279987ae7a07d8ad00dc6586ce5d01210261fea9c7bc9c145112342cec753d51a0706f35f7c655727390c04eefe71c48d5","witness":""}],"out":[{"value":10000,"tx_index":362720924,"n":0,"spent":false,"script":"a91488d5099f0771c73ccb6cdac3a8fd8aab30a36fbe87","type":0,"addr":"3EAX2k5CioUwvn5suf1Uoc91amqWxcoSCi"}]}]}')
const outputsChecker = JSON.parse('[{"tx_hash":"cabaddeb42b42ede801d56f76026636f901e298345a82e3900cd342e9e913920","tx_hash_big_endian":"2039919e2e34cd00392ea84583291e906f632660f7561d80de2eb442ebddbaca","tx_index":362720924,"tx_output_n": 0,"script":"a91488d5099f0771c73ccb6cdac3a8fd8aab30a36fbe87","value": 10000,"value_hex": "2710","confirmations":137}]')

const destinationAddress = '1QCWgENaTr2VQDCzxd9yPEnh8QBabe68eF';
const accountInfo = {
    network: 'bitcoin-multisig',
    MofNpath: [0,1],
    MofNchangeAddress: '3DWTeiAqVqiohZbHYDxggshSyNnZwKGbxt',
    activity: activity,
    unspentOutputs: outputsChecker
}

suite('sign multisig Transaction', function() {
    test('can sign an unsigned transaction with one signature', function() {

        return elrnClient.prepareTransaction(destinationAddress, sendAmount , accountInfo, currentAddress)
        .then((transactionPackage) => {
            return elrnClient.xPrivToKeyPair(xPriv, accountInfo.MofNpath)
            .then((keyPairs) => {
                return elrnClient.signMultisigTx(transactionPackage.preparedTransaction, keyPairs[0], MofNObject)
                .then((semiSignedTransaction)=> {
                  //assert that the first signature in the array is not undefined, and that the second one still is
                    assert.notEqual(semiSignedTransaction.__inputs[0].signatures[0] , undefined)
                    assert.equal(semiSignedTransaction.__inputs[0].signatures[1] , undefined)
                })
            }).catch(err => {throw new Error(err)});
        });
    }); 
    test('can completely sign an unsigned multi-sig transaction ', function() {

        return elrnClient.prepareTransaction(destinationAddress, sendAmount , accountInfo, currentAddress)
        .then((transactionPackage) => {
            return elrnClient.xPrivToKeyPair(xPriv, accountInfo.MofNpath)
            .then((keyPairs) => {
                return elrnClient.signMultisigTx(transactionPackage.preparedTransaction, keyPairs[0], MofNObject)
                .then((semiSignedTransaction)=> {
                  //assert that the first signature in the array is not undefined, and that the second one still is
                    assert.notEqual(semiSignedTransaction.__inputs[0].signatures[0] , undefined)
                    assert.equal(semiSignedTransaction.__inputs[0].signatures[1] , undefined)
                  return elrnClient.signMultisigTx(transactionPackage.preparedTransaction, keyPairs[1], MofNObject)
                  .then((semiSignedTransaction)=> {
                        assert.notEqual(semiSignedTransaction.__inputs[0].signatures[1] , undefined)
                    })
                })
            })
        })
        .catch(err => {throw new Error(err)});
    });
}); 
   