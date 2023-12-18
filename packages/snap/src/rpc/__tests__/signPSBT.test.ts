import { networks } from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import { BitcoinNetwork, ScriptType } from '../../interface';
import { signPsbt } from '../../rpc';
import { SnapMock } from '../__mocks__/snap';
import { extractAccountPrivateKey } from '../../rpc/getExtendedPublicKey';
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { RequestErrors } from '../../errors';

jest.mock('../../rpc/getExtendedPublicKey');

const mockSignPsbt = jest.fn();
jest.mock("../../bitcoin", () => {
  return {
    BtcPsbt: jest.fn().mockImplementation(() => {
      return {
        validatePsbt: () => true,
        extractPsbtJson: jest.fn().mockReturnValue({
          from: "mx5m68zHiGnFEoMjTdkWinmBAYsWyp9DJk",
          to: "mx5m68zHiGnFEoMjTdkWinmBAYsWyp9DJk",
          value: 9500,
          fee: 500,
          network: "test"
        }),
        signPsbt: mockSignPsbt
      };
    }),
    AccountSigner: jest.fn()
  };
})

describe('signPsbt', () => {
  const snapStub = new SnapMock();
  const domain = "www.justsnap.io"
  const testAccountPrivateKey = "tprv8fe4HaTiB6QR4cH4CyquRVRuK4th5szSpg4e16cXAMN7bRw8thc7S12ZehjXpcyQhuz91MafyyhqV2bezHqCE2JdcDmQSB5ycoKvtBxCKoS"
  const testPsbtBase64 = "cHNidP8BAFUCAAAAAT9MXJk0OEoyuubJXTnMqxo7Hj08Wv7yHJsw9URN/9a7AQAAAAD/////ARwlAAAAAAAAGXapFLW2YqzVecKrjOg8i5S0MDzxe/OmiKwAAAAAAAEA4QIAAAAAAQGGHEltyRyXjljtT3zc4tO1/4Y1U5zibwVdAl9QxaXdCQEAAAAA/v///wI1xv9wAAAAABYAFIWiDQ/MrBorRi/oI6gcJXZ8OlKRECcAAAAAAAAZdqkUtbZirNV5wquM6DyLlLQwPPF786aIrAJHMEQCICh8bgzVpHXdYRzjQKHwro1i8zZQWb9JF0C90qy2UbN+AiA6x4zrT04ZDicTqT2xUuFywc7e1H/BYwm69N1w6W6/wAEhA2ijz+sT/T1ycTtaI1/ZfCmtv5r8BkT52aFU1akQJlJHqmchACIGA5QpeTH0HwcDirFXCpKj+/v0ttc8sOP4PwSLUJRWIJiXDP0+QYsAAAAAAAAAAAAA"

  beforeAll(() => {
    (extractAccountPrivateKey as jest.Mock).mockResolvedValue({
      node: BIP32Factory(ecc).fromBase58(testAccountPrivateKey, networks.regtest),
      mfp: 'fd3e418b'
    })
  });

  afterEach(() => {
    snapStub.reset()
  });

  it('should call BtcPsbt to sign psbt if user approved', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_manageState.mockResolvedValue({ network: BitcoinNetwork.Test });

    await signPsbt(domain, snapStub, testPsbtBase64, BitcoinNetwork.Test, ScriptType.P2PKH)
    await expect(mockSignPsbt).toHaveBeenCalled();
  });

  it('should reject the sign request and throw error if user reject the sign the pbst', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(signPsbt(domain, snapStub, testPsbtBase64, BitcoinNetwork.Test, ScriptType.P2PKH))
      .rejects
      .toThrowError('User reject the sign request');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });

  it('should reject if network is wrong', async () => {
    await expect(signPsbt(domain, snapStub, testPsbtBase64, BitcoinNetwork.Main, ScriptType.P2PKH))
      .rejects
      .toThrowError(RequestErrors.NetworkNotMatch.message);
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });
});
