import { BitcoinNetwork } from '../../interface'
import { BlockChair } from '../../lib/explorer'
import sinon from 'sinon'

jest.setTimeout(500000)

describe('lib', () => {

    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
        fetchStub = sinon.stub(window, 'fetch'); //add stub
    })

    afterEach(() => {
        fetchStub.restore(); //
    })

    it('should status as required', async () => {
        fetchStub.onFirstCall().resolves({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    "xpub1": {
                        addresses: {
                            'address1': {
                                path: '1/3'
                            },
                            'address2': {
                                path: '0/2'
                            }
                        },
                        utxo: [{
                            "block_id": 1,
                            "transaction_hash": "hash123",
                            "index": 0,
                            "value": 2,
                            "address": "address1"
                        }]
                    }
                }
            }
            )
        })

        fetchStub.onSecondCall().resolves({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    "hash123": {
                        "raw_transaction": "rawTx"
                    }
                }
            })
        })

        const key = 'test_key'
        const explorer = new BlockChair(key, BitcoinNetwork.Test)
    
        const {utxos, recieveMax, changeMax} = await explorer.getStatus("xpub1", true)
        expect(utxos.length).toBe(1)
        expect(recieveMax).toBe(2)
        expect(changeMax).toBe(3)
    })

    it('should return empty list ', async () => {
        fetchStub.onFirstCall().resolves({
            ok: false,
            status: 404,
            json: () => Promise.resolve({})
        })

        fetchStub.onSecondCall().resolves({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    "hash123": {
                        "raw_transaction": "rawTx"
                    }
                }
            })
        })

        const key = 'test_key'
        const explorer = new BlockChair(key, BitcoinNetwork.Test)
        

        const {utxos, recieveMax, changeMax} = await explorer.getStatus("xpub1", true)
        expect(utxos.length).toEqual(0)
        expect(recieveMax).toBe(0)
        expect(changeMax).toBe(0)
    })

    it('should throw error if the status is none 200 or 404 ', async () => {
        try {
            fetchStub.onFirstCall().resolves({
                ok: false,
                status: 500,
                json: () => Promise.resolve({})
            })

            fetchStub.onSecondCall().resolves({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        "hash123": {
                            "raw_transaction": "rawTx"
                        }
                    }
                })
            })

            const key = 'test_key'
            const explorer = new BlockChair(key, BitcoinNetwork.Test)
            await explorer.getStatus("xpub1", true)
        } catch (e) {
            expect(e).toEqual(new Error('fetch utxo data error'))
        }
    })

    it('should raise error when fetch raw tx error ', async () => {
        try {
            fetchStub.onFirstCall().resolves({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        "xpub1": {
                            addresses: {
                                'address1': {
                                    path: '1/3'
                                },
                                'address2': {
                                    path: '0/2'
                                }
                            },
                            utxo: [{
                                "block_id": 1,
                                "transaction_hash": "hash123",
                                "index": 0,
                                "value": 2,
                                "address": "address1"
                            }]
                        }
                    }
                }
                )
            })

            fetchStub.onSecondCall().resolves({
                ok: false,
                json: () => Promise.resolve({})
            })

            const key = 'test_key'
            const explorer = new BlockChair(key, BitcoinNetwork.Test)


            await explorer.getStatus("xpub1", true)
        } catch (e) {
            expect(e).toEqual(new Error('fetch tx data error'))
        }

    })

    it('should fetch suggested fee rat', async () => {
        fetchStub.onFirstCall().resolves({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    "suggested_transaction_fee_per_byte_sat": 5
                }
            })
        })
        const key = 'test_key'
        const explorer = new BlockChair(key, BitcoinNetwork.Test)
        const result = await explorer.getSuggestFeeRate()
        expect(result).toBe(5)
    })

    it('should convert tpub to xpub', () => {
        const tpub = "tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB"
        const ypub = "upub5EKD4VtV4TTbKRrPo7fKUx5i5BP5nP5sb7e3BYi9ydjATnGwKkChYGfDLggrj9PXmxZYtiukGQaHWG5AWVkCmjmbQHviXYy7UMCECw5BEcW"
        const vpub = "vpub5ZEjGDr1LN8ensYCDyrNLN56EfxmdSUNZs42iCXeEeu8TL8zUidS4TBoNeMrMPv6vu3vR74GMUM8NxK4Hi5zebzxp25ZyLKbyUPnLNRak2W"
        const key = 'test_key'
        const explorer = new BlockChair(key, BitcoinNetwork.Test)
        const converted = explorer.convertPubKeyFormate(tpub)
        expect(converted).toBe("xpub661MyMwAqRbcFpC47D9RZoghtur8NPtTwgBhTSaJBdaweZ4b66cVLnVvQLbSu9i3MsgxJAXrXMFxS6r8THCUNvYy7SaFsbP513fgxuSRJWn")
        const converted2 = explorer.convertPubKeyFormate(ypub)
        expect(converted2).toBe("ypub6QqdH2c5z79667pmStimqLrwdw2LJGNVe7xPi7Dc9fKzg5qL4KQrmZP3fSRZ8MsRnyZBhwfEycRSmNsyUEpc1MZUgnqxSAtyvMiobVMFL6H")
        const converted3 = explorer.convertPubKeyFormate(vpub)
        expect(converted3).toBe("zpub6jftahH18ngZxukwaV4zYQR49gz8o55Xj24xQJf2iSaq3n7FdEvL8LTSXWqNFs9QpMPXM5cyC8yQ6ADgPfqhLSAg6cBdW2Qiy4C5yJoioxW")
    })

    // it.only('should work', async () => {
    //     const test_key = "A___VmKhrQNcUYF3Q0DJZB5VWlHGS2Dt"
    //     const explorer = new BlockChair(test_key, BitcoinNetwork.Test)
    //     const result = await explorer.getStatus("tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB", true)
    //     console.log(result);

    // })
})