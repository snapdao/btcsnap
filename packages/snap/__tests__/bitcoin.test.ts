import { BtcTx, AccountSigner } from '../src/bitcoin'
import { Psbt, networks } from 'bitcoinjs-lib'
import * as bip32 from 'bip32'
import console from 'console'


function getAccountSigner() {
    // only for testing
    const testPrivateAccountKey = "tprv8fe4HaTiB6QR4cH4CyquRVRuK4th5szSpg4e16cXAMN7bRw8thc7S12ZehjXpcyQhuz91MafyyhqV2bezHqCE2JdcDmQSB5ycoKvtBxCKoS"
    let accoutNode = bip32.fromBase58(testPrivateAccountKey, networks.regtest)
    return { signer: new AccountSigner(accoutNode), node: accoutNode }
}


function getPsbtTx(pubkeyBuffer) {
    const psbtTx = new Psbt({ network: networks.regtest });
    psbtTx.setVersion(2);
    psbtTx.addInput({
        hash: 'bbd6ff4d44f5309b1cf2fe5a3c3d1e3b1aabcc395dc9e6ba324a3834995c4c3f',
        index: 1,
        sequence: 4294967295,
        nonWitnessUtxo: Buffer.from("02000000000101861c496dc91c978e58ed4f7cdce2d3b5ff8635539ce26f055d025f50c5a5dd090100000000feffffff0235c6ff700000000016001485a20d0fccac1a2b462fe823a81c25767c3a529110270000000000001976a914b5b662acd579c2ab8ce83c8b94b4303cf17bf3a688ac024730440220287c6e0cd5a475dd611ce340a1f0ae8d62f3365059bf491740bdd2acb651b37e02203ac78ceb4f4e190e2713a93db152e172c1ceded47fc16309baf4dd70e96ebfc001210368a3cfeb13fd3d72713b5a235fd97c29adbf9afc0644f9d9a154d5a910265247aa672100", 'hex')
    });
    psbtTx.addOutput({
        address: "mx5m68zHiGnFEoMjTdkWinmBAYsWyp9DJk",
        value: 9500
    });


    return psbtTx

}


describe('bitcoin test', () => {

    describe('AccountSigner', () => {
        it('should generate account signer', () => {
            const node = bip32.fromBase58("tprv8gPsNk5FBsGJaZ24gLekPDLjcoRF81foUXikKQBF8beU6KYyHUGnM3zR9QhG1Yme6sqWkwAmJg2Fr7SNgNGSNMh7KKoqqpreLYvkUGUYbcb", networks.regtest)
            const signer = new AccountSigner(node)
            const childSigner = signer.derivePath("m/0")
            expect(childSigner.fingerprint.toString("hex")).toBe("8515a7b3")
        })

        it('should raise error if the path is not right', () => {
            const node = bip32.fromBase58("tprv8gPsNk5FBsGJaZ24gLekPDLjcoRF81foUXikKQBF8beU6KYyHUGnM3zR9QhG1Yme6sqWkwAmJg2Fr7SNgNGSNMh7KKoqqpreLYvkUGUYbcb", networks.regtest)
            const signer = new AccountSigner(node)
            expect(() => signer.derivePath("m-0")).toThrow('invaild path')
        })

        it('should able to sign ', () => {
            const node = bip32.fromBase58("tprv8gPsNk5FBsGJaZ24gLekPDLjcoRF81foUXikKQBF8beU6KYyHUGnM3zR9QhG1Yme6sqWkwAmJg2Fr7SNgNGSNMh7KKoqqpreLYvkUGUYbcb", networks.regtest)
            const signer = new AccountSigner(node)
            const testBuffer = Buffer.from("936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af", "hex")
            const signature = signer.sign(testBuffer)
            expect(signature.toString("hex")).toBe("a0505e4b96ef51b84d51259876a13df673324f77e6f37bde7a4c6d6829e2c6177d81571a28210d5428302389a7f64bc78973c4a9f9aa70a970ecf6702460f169")
        })

    });

    describe('BtcTx', () => {
        it('should be able to construct the tx and extract the psbt json', () => {
            const testPsbtBase64 = "cHNidP8BAJwCAAAAAlVzsBWMfOCyW7PQz/c0Tjaco9vO4s5NiIhA//Sa4XzQAQAAAAD9////4BTcI2NIambjN7gC2nByKjIGX3qeT9Ta8OBnqjH45YkAAAAAAP3///8C948BAAAAAAAXqRSRWJI2amzfJK+m4cSA2yrYjGM3gIeYiVsAAAAAABepFJFYkjZqbN8kr6bhxIDbKtiMYzeAhwAAAAAAAQEg9Jg2AAAAAAAXqRSRWJI2amzfJK+m4cSA2yrYjGM3gIcBBBYAFOnPkTHZwCo6AtJGu0KXtWBsbLL5IgYC8yWoWQLSZNvLDL4UTpskY/glK9DFG8GWZvTIJGHkuqIYAQEBATEAAIAAAACAAAAAgAAAAAAAAAAAAAEBIIOEJgAAAAAAF6kUdFxWGQ0f6CdOfr6d1P4QyjSElZWHAQQWABQwB6va/o+HXD07cUQo53YUlKcfbCIGAvMlqFkC0mTbywy+FE6bJGP4JSvQxRvBlmb0yCRh5LqiGAEBAQExAACAAAAAgAAAAIAAAAAAAAAAAAAAAA==";
            const tx = new BtcTx(testPsbtBase64);
            const testJson = tx.extractPsbtJson();
            expect(testJson.inputs.length).toBe(2)
            expect(testJson.outputs.length).toBe(2)
            expect(testJson.inputs[0].prevTxId).toBe("5573b0158c7ce0b25bb3d0cff7344e369ca3dbcee2ce4d888840fff49ae17cd0")
            expect(testJson.outputs[0].address).toBe("3EwY1PaQ5fB4M4nvWRYgUn2LNmokeJ36Pj")
        })


        it('should be able to validate the psbt which all contains bip32 path and pubkey is matched', () => {
            const { signer, node } = getAccountSigner()
            const psbtTx = getPsbtTx(node.derive(0).derive(0).publicKey)

            psbtTx.updateInput(0, {
                bip32Derivation: [
                    {
                        masterFingerprint: node.fingerprint,
                        path: 'm/0/0',
                        pubkey: node.derive(0).derive(0).publicKey
                    }
                ]
            })
            const tx = new BtcTx(psbtTx.toBase64())
            expect(tx.validateTx(signer)).toBe(true)
        })

        it('should be able to validate the psbt which all contains bip32 path and pubkey is not matched', () => {
            const { signer, node } = getAccountSigner()
            const psbtTx = getPsbtTx(node.derive(0).derive(0).publicKey)

            psbtTx.updateInput(0, {
                bip32Derivation: [
                    {
                        masterFingerprint: node.fingerprint,
                        path: 'm/0/1',
                        pubkey: node.derive(0).derive(0).publicKey
                    }
                ]
            })
            const tx = new BtcTx(psbtTx.toBase64())
            expect(tx.validateTx(signer)).toBe(false)
        })

        it("should be able to sign transaction and extract txId and txHex", () => {

            const { signer, node } = getAccountSigner()
            const psbtTx = getPsbtTx(node.derive(0).derive(0).publicKey)
            psbtTx.updateInput(0, {
                bip32Derivation: [
                    {
                        masterFingerprint: node.fingerprint,
                        path: 'm/0/0',
                        pubkey: node.derive(0).derive(0).publicKey
                    }
                ]
            })

            const tx = new BtcTx(psbtTx.toBase64())
            const { txId, txHex } = tx.signTx(signer)
            expect(txId).toBe("e2622d89aec4d1a97a416d9219017d7e6c79b418488f10a75386ea26f4ae9049")
            expect(txHex).toBe("02000000013f4c5c9934384a32bae6c95d39ccab1a3b1e3d3c5afef21c9b30f5444dffd6bb010000006a4730440220045bb7cd65a9e814db9cdf86be57b181530301cbabf3fbba3ab4b0a1782a4e9102207a01ed0ae1d6a18f20ebf21960b78be9efd623aa99882c5ce0790ee86abee6eb01210394297931f41f07038ab1570a92a3fbfbf4b6d73cb0e3f83f048b509456209897ffffffff011c250000000000001976a914b5b662acd579c2ab8ce83c8b94b4303cf17bf3a688ac00000000")
        })
    })

})