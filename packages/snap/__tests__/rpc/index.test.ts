import { networks } from 'bitcoinjs-lib';
import { ScriptType } from '../../src/interface';
import { getExtendedPublicKey, signPsbt } from '../../src/rpc'
import { WalletMock } from './wallet.mock'


describe('rpc', () => {

    const walletStub = new WalletMock();

    afterEach(() => {
        walletStub.reset()
    })

    it('should get extended publick key from wallet', async () => {
        const testKey = "HRY3tCVydyIwr4otVgaAKfiqDGH9F9yZqwNjYFAr4Bq5IOMWQTVJ+vrKkm2HC9CsxVAgTj3HAJjNfa3bazzahw=="
        walletStub.rpcStubs.snap_getBip44Entropy_1.resolves({key:testKey});
        const extendPub = await getExtendedPublicKey(walletStub, ScriptType.P2PKH, networks.regtest)
        expect(walletStub.rpcStubs.snap_getBip44Entropy_1.calledOnce).toBe(true);
        expect(extendPub).toBe("tpubDCL6RzVxKU65x5Jr6dWVpu61t6QdFDBMPyfRHcepadAWRvBuX6RhcVeRprao5GPZZFDTKoLQXmnNNUSNsRrgpQzkkvTrJcM87saJBsgxPQT")
    })

    
})