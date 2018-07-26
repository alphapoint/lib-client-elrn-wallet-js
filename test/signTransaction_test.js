/*eslint-env node, mocha, es6 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;
import Elrn from '..';

suite('signTransaction', function() {
    test('can sign a unsigned transaction', function() {
        const config = require(__dirname + '/config/options.js');
        const elrnClient = new Elrn(config);
        const xPub= 'xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc';
        const xPriv = 'xprv9yEcdEMShowWaR4d4QG1kuhTDeQAe5arJtppZqknZUT8n81XehMjjC9EsNQuDUGtPULvm3E5s3qSkhXEL7WGKMJREMpSeeN1pdJTSK1qigj';
        //both activity and outputschecker is from xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc
        const activity = JSON.parse('{"recommend_include_fee":true,"info":{"nconnected":0,"conversion":100000000.00000000,"symbol_local":{"code":"USD","symbol":"$","name":"U.S. dollar","conversion":12200.83551322,"symbolAppearsAfter":false,"local":true},"symbol_btc":{"code":"BTC","symbol":"BTC","name":"Bitcoin","conversion":100000000.00000000,"symbolAppearsAfter":true,"local":false},"latest_block":{"block_index":1711523,"hash":"00000000000000000012f4f1b876fc5b7343a7737b64e72a76eb66a1dfe2f2fe","height":533798,"time":1532623386}},"wallet":{"n_tx":3,"n_tx_filtered":3,"total_received":100000,"total_sent":12000,"final_balance":88000},"addresses":[{"address":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","n_tx":3,"total_received":100000,"total_sent":12000,"final_balance":88000,"gap_limit":20,"change_index":3,"account_index":11}],"txs":[{"hash":"2039919e2e34cd00392ea84583291e906f632660f7561d80de2eb442ebddbaca","ver":1,"vin_sz":2,"vout_sz":2,"size":371,"weight":1484,"fee":1000,"relayed_by":"0.0.0.0","lock_time":0,"tx_index":362720924,"double_spend":false,"result":-11000,"balance":88000,"time":1532555625,"block_height":533664,"inputs":[{"prev_out":{"value":1000,"tx_index":359932111,"n":0,"spent":true,"script":"76a9149e0901d835508c3b8d94456a133c4f57afb9c40488ac","type":0,"addr":"1FQcZ9AfYAGasWVHXYP7Nd4n2pDSdiwkWy","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/10"}},"sequence":4294967295,"script":"483045022100ee0b962827787e18966457a856cfa9cdedcf980264a10c3da63a2a1e4190529b02204f3a4bb86b3352e4aedde189608dbe7d3eb5db94c0505a0508364a16f70b4aaf012102ca94c8162f8dae4e213af19b298875adbcbc5b497388c6cc292e8784043626c0","witness":""},{"prev_out":{"value":98000,"tx_index":359932111,"n":1,"spent":true,"script":"76a9141e3281992ef0d9f60c18d8e830d8b68f2151c69888ac","type":0,"addr":"13kfmzSB5a1uAxiXdXJnG5B6Yoik7sJAts","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/1"}},"sequence":4294967295,"script":"473044022009332c6b5e6152f9ffbbe7e44100b31a01cd1311488c5c2a2929763682d811c302205ba698fd4ea25ecb16e7972011659a1b4ae7279987ae7a07d8ad00dc6586ce5d01210261fea9c7bc9c145112342cec753d51a0706f35f7c655727390c04eefe71c48d5","witness":""}],"out":[{"value":10000,"tx_index":362720924,"n":0,"spent":false,"script":"a91488d5099f0771c73ccb6cdac3a8fd8aab30a36fbe87","type":0,"addr":"3EAX2k5CioUwvn5suf1Uoc91amqWxcoSCi"},{"value":88000,"tx_index":362720924,"n":1,"spent":false,"script":"76a91492727a767d8af5db992dad71c6d39954948a9b2888ac","type":0,"addr":"1EMLo72RDpjV8ZRKFKxn9U2TNGfDnoHpoS","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/1/2"}}]},{"hash":"aad0525f1083a9e1dc2ee5ba062b5ef30f54a41fb164aab236d4664818431644","ver":1,"vin_sz":1,"vout_sz":2,"size":225,"weight":900,"fee":1000,"relayed_by":"127.0.0.1","lock_time":0,"tx_index":359932111,"double_spend":false,"result":-1000,"balance":99000,"time":1531428122,"block_height":531660,"inputs":[{"prev_out":{"value":100000,"tx_index":355831067,"n":0,"spent":true,"script":"76a914d9f055f5d7406177cc48047bef118e323127b86c88ac","type":0,"addr":"1LsMYT7CRunQ4njP1UjUDAeHQEqGxNVrUK","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/0"}},"sequence":4294967295,"script":"473044022051ae07728adaf0041b9a9c55dc5eb3ee0202aa2539ea8369273e7d83b7574c03022004627e9e5e3bd7aeef0d4fd54a7374f4ce393825a37fe848283ca26688087413012103a39a79021159b886bfbed821914c24a00db1baa9dbf90957f9727a45cd7ee3ab","witness":""}],"out":[{"value":1000,"tx_index":359932111,"n":0,"spent":true,"script":"76a9149e0901d835508c3b8d94456a133c4f57afb9c40488ac","type":0,"addr":"1FQcZ9AfYAGasWVHXYP7Nd4n2pDSdiwkWy","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/10"}},{"value":98000,"tx_index":359932111,"n":1,"spent":true,"script":"76a9141e3281992ef0d9f60c18d8e830d8b68f2151c69888ac","type":0,"addr":"13kfmzSB5a1uAxiXdXJnG5B6Yoik7sJAts","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/1"}}]},{"hash":"5bb5e8c28622d707b683ec39f02fa6f723abde103aff6680fa7cfb3d8ab24871","ver":1,"vin_sz":1,"vout_sz":2,"size":226,"weight":904,"fee":1356,"relayed_by":"127.0.0.1","lock_time":0,"tx_index":355831067,"double_spend":false,"result":100000,"balance":100000,"time":1529611683,"block_height":528585,"inputs":[{"prev_out":{"value":422454,"tx_index":334094995,"n":1,"spent":true,"script":"76a914bc7077c696fa4dd0ae3b2a1250b19d30ebd4c82388ac","type":0,"addr":"1JBNmUCiQdV2GB3KXLuBs8HYHrXwtNvo5v"},"sequence":4294967295,"script":"483045022100a9178f16087639553ff46fe55aab16f8d571625333407a4512a1ce979afa301402201a1e55dfcd00cf666b6ae3d0764d1dfbaa9f65d79f35804c9ac377a187c82b19012103ac06c583907468d51c0967d8a00de721cefa886f1eecb3827fa3f1883fc0adee","witness":""}],"out":[{"value":100000,"tx_index":355831067,"n":0,"spent":true,"script":"76a914d9f055f5d7406177cc48047bef118e323127b86c88ac","type":0,"addr":"1LsMYT7CRunQ4njP1UjUDAeHQEqGxNVrUK","xpub":{"m":"xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc","path":"M/0/0"}}]}]}')
        const outputsChecker = JSON.parse('[{"tx_hash":"cabaddeb42b42ede801d56f76026636f901e298345a82e3900cd342e9e913920","tx_hash_big_endian":"2039919e2e34cd00392ea84583291e906f632660f7561d80de2eb442ebddbaca","tx_index":362720924,"tx_output_n": 1,"script":"76a91492727a767d8af5db992dad71c6d39954948a9b2888ac","xpub" : {    "m" : "xpub6CDy2jtLYBVonu96ARo283eBmgEf3YJhg7kRNEAQ7oz7evLgCEfzGzTiieb8KjgwWzD7R49b5noTnTmKMQK8cZ9zPojTGtLtyNRcxDRQWWc",    "path" : "M/1/2"},"value": 88000,"value_hex": "0157c0","confirmations":135}]')
        
        const sendAmount = 1100;
        const destinationAddress = '1FQcZ9AfYAGasWVHXYP7Nd4n2pDSdiwkWy';
        const accountInfo = {
            network: 'bitcoin',
            activity: activity,
            unspentOutputs:outputsChecker
        }
        return elrnClient.prepareTransaction(destinationAddress, sendAmount , accountInfo, xPub)
        .then((transactionPackage) => {
        	return elrnClient.xPrivToKeyPair(xPriv, transactionPackage.inputPaths)
            .then((keyPairs) => {
                return elrnClient.signTransaction(transactionPackage.preparedTransaction, keyPairs)
                .then((signedTransaction)=> {
                    assert.isAbove(signedTransaction.build().toHex().length, 200 )
                })
            })
        })
        .catch(err => {throw new Error(err)});
    });
});    