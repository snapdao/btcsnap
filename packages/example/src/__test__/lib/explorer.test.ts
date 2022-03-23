import { BitcoinNetwork } from '../../lib'
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

    it('should return the uxto list as required', async () => {
        fetchStub.onFirstCall().resolves({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    utxo: [{
                        "block_id": 1,
                        "transaction_hash": "hash123",
                        "index": 0,
                        "value": 2,
                        "address": "address1"
                    }
                    ]
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
        const addresses = [
            'muokkQPLtEJ9fqMnMFMQsoxRosWxEEHd8i',
        ]

        const result = await explorer.getUtxos(addresses, true)

        expect(result.length).toEqual(1)
        expect(result[0]["transactionHash"]).toEqual('hash123')

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
        const addresses = [
            'muokkQPLtEJ9fqMnMFMQsoxRosWxEEHd8i',
        ]

        const result = await explorer.getUtxos(addresses, true)
        expect(result.length).toEqual(0)
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
            const addresses = [
                'muokkQPLtEJ9fqMnMFMQsoxRosWxEEHd8i',
            ]

            await explorer.getUtxos(addresses, true)
        } catch (e) {
            expect(e).toEqual(new Error('fetch utxo data error'))
        }
    })

    it('should return empty list ', async () => {
        try {
            fetchStub.onFirstCall().resolves({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        utxo: [{
                            "block_id": 1,
                            "transaction_hash": "hash123",
                            "index": 0,
                            "value": 2,
                            "address": "address1"
                        }
                        ]
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
            const addresses = [
                'muokkQPLtEJ9fqMnMFMQsoxRosWxEEHd8i',
            ]
    
            const result = await explorer.getUtxos(addresses, true)
            expect(result.length).toEqual(0)
        } catch (e) {
            expect(e).toEqual(new Error('fetch tx data error'))
        }
        
    })


})