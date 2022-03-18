import { networks } from 'bitcoinjs-lib';
import { ScriptType } from '../../src/interface';
import { getExtendedPublicKey, signPsbt } from '../../src/rpc'
import { WalletMock } from './wallet.mock'


describe('rpc', () => {

    const walletStub = new WalletMock();
    const testKey = "HRY3tCVydyIwr4otVgaAKfiqDGH9F9yZqwNjYFAr4Bq5IOMWQTVJ+vrKkm2HC9CsxVAgTj3HAJjNfa3bazzahw=="
    const testPsbtBase64 = "cHNidP8BAFUCAAAAAT9MXJk0OEoyuubJXTnMqxo7Hj08Wv7yHJsw9URN/9a7AQAAAAD/////ARwlAAAAAAAAGXapFLW2YqzVecKrjOg8i5S0MDzxe/OmiKwAAAAAAAEA4QIAAAAAAQGGHEltyRyXjljtT3zc4tO1/4Y1U5zibwVdAl9QxaXdCQEAAAAA/v///wI1xv9wAAAAABYAFIWiDQ/MrBorRi/oI6gcJXZ8OlKRECcAAAAAAAAZdqkUtbZirNV5wquM6DyLlLQwPPF786aIrAJHMEQCICh8bgzVpHXdYRzjQKHwro1i8zZQWb9JF0C90qy2UbN+AiA6x4zrT04ZDicTqT2xUuFywc7e1H/BYwm69N1w6W6/wAEhA2ijz+sT/T1ycTtaI1/ZfCmtv5r8BkT52aFU1akQJlJHqmchACIGA5QpeTH0HwcDirFXCpKj+/v0ttc8sOP4PwSLUJRWIJiXDP0+QYsAAAAAAAAAAAAA"

    afterEach(() => {
        walletStub.reset()
    })


    describe('getExtendedPublicKey', () => {
        it('should get extended publick key from wallet if user approve', async () => {
            
            walletStub.rpcStubs.snap_confirm.resolves(true);
            walletStub.rpcStubs.snap_getBip44Entropy_1.resolves({ key: testKey });
            const extendPub = await getExtendedPublicKey(walletStub, ScriptType.P2PKH, networks.regtest)
            expect(walletStub.rpcStubs.snap_getBip44Entropy_1.calledOnce).toBe(true);
            expect(extendPub).toBe("tpubDCL6RzVxKU65x5Jr6dWVpu61t6QdFDBMPyfRHcepadAWRvBuX6RhcVeRprao5GPZZFDTKoLQXmnNNUSNsRrgpQzkkvTrJcM87saJBsgxPQT")
        })
    
        it('should raise error if user reject', async () => {
            try {
                walletStub.rpcStubs.snap_confirm.resolves(false);
                await getExtendedPublicKey(walletStub, ScriptType.P2PKH, networks.regtest)
                
            } catch (e) {
                expect(walletStub.rpcStubs.snap_getBip44Entropy_1.calledOnce).toBe(false);
                expect(e).toEqual(new Error('User reject to access the key'));            
            }
        })
    })

    describe('signPsbt', () => {
        it('should sign the psbt and get txId and txHex if user approved', async () => {

            walletStub.rpcStubs.snap_confirm.resolves(true);
            walletStub.rpcStubs.snap_getBip44Entropy_1.resolves({ key: testKey });
            const result = await signPsbt(walletStub, testPsbtBase64, networks.regtest)
            expect(walletStub.rpcStubs.snap_getBip44Entropy_1.calledOnce).toBe(true);
            expect(result.txId).not.toBeUndefined();
            expect(result.txHex).not.toBeUndefined();
        })

        it('should reject the sign request and throw error if user reject the sign the pbst', async () => {
            try {
                walletStub.rpcStubs.snap_confirm.resolves(false);
                await signPsbt(walletStub, testPsbtBase64, networks.regtest)
            } catch (e) {
                expect(walletStub.rpcStubs.snap_getBip44Entropy_1.calledOnce).toBe(false);
                expect(e).toEqual(new Error('user reject the sign request'))
            }
        })

        
    })

    
})