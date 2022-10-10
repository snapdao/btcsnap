import { networks } from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import { BitcoinNetwork, ScriptType } from '../../interface';
import { signPsbt } from '../../rpc';
import { WalletMock } from '../__mocks__/wallet';
import { extractAccountPrivateKey } from '../../rpc/getExtendedPublicKey';

jest.mock('../../rpc/getExtendedPublicKey');

const mockSignPsbt = jest.fn();
jest.mock("../../bitcoin", () => {
  return {
    BtcTx: jest.fn().mockImplementation(() => {
      return {
        validateTx: () => true,
        extractPsbtJsonString: () => {},
        signTx: mockSignPsbt
      };
    }),
    AccountSigner: jest.fn()
  };
})

describe('signPsbt', () => {
  const walletStub = new WalletMock();
  const domain = "www.justsnap.io"
  const testAccountPrivateKey = "tprv8fe4HaTiB6QR4cH4CyquRVRuK4th5szSpg4e16cXAMN7bRw8thc7S12ZehjXpcyQhuz91MafyyhqV2bezHqCE2JdcDmQSB5ycoKvtBxCKoS"
  const testPsbtBase64 = "cHNidP8BAFUCAAAAAT9MXJk0OEoyuubJXTnMqxo7Hj08Wv7yHJsw9URN/9a7AQAAAAD/////ARwlAAAAAAAAGXapFLW2YqzVecKrjOg8i5S0MDzxe/OmiKwAAAAAAAEA4QIAAAAAAQGGHEltyRyXjljtT3zc4tO1/4Y1U5zibwVdAl9QxaXdCQEAAAAA/v///wI1xv9wAAAAABYAFIWiDQ/MrBorRi/oI6gcJXZ8OlKRECcAAAAAAAAZdqkUtbZirNV5wquM6DyLlLQwPPF786aIrAJHMEQCICh8bgzVpHXdYRzjQKHwro1i8zZQWb9JF0C90qy2UbN+AiA6x4zrT04ZDicTqT2xUuFywc7e1H/BYwm69N1w6W6/wAEhA2ijz+sT/T1ycTtaI1/ZfCmtv5r8BkT52aFU1akQJlJHqmchACIGA5QpeTH0HwcDirFXCpKj+/v0ttc8sOP4PwSLUJRWIJiXDP0+QYsAAAAAAAAAAAAA"

  beforeAll(() => {
    (extractAccountPrivateKey as jest.Mock).mockResolvedValue({
      node: bip32.fromBase58(testAccountPrivateKey, networks.regtest),
      mfp: 'fd3e418b'
    })
  })

  afterEach(() => {
    walletStub.reset()
  })

  it('should call BtcTx to sign psbt if user approved', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
    walletStub.rpcStubs.snap_manageState.mockResolvedValue({network: BitcoinNetwork.Test});

    await signPsbt(domain, walletStub, testPsbtBase64, BitcoinNetwork.Test, ScriptType.P2PKH)
    await expect(mockSignPsbt).toHaveBeenCalled();
  })

  it('should reject the sign request and throw error if user reject the sign the pbst', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);

    await expect(signPsbt(domain, walletStub, testPsbtBase64, BitcoinNetwork.Test, ScriptType.P2PKH))
      .rejects
      .toThrowError('User reject the sign request');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  })
});
