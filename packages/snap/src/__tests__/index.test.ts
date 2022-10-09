import { onRpcRequest } from '../index';
import { getExtendedPublicKey, signPsbt, masterFingerprint, manageNetwork, validateRequest } from '../rpc';
import { BitcoinNetwork, ScriptType } from '../interface';
import { WalletMock } from '../rpc/__mocks__/wallet';

jest.mock('../utils/manageState', () => ({
  getPersistedData: jest.fn().mockResolvedValue('test'), // network
}));

jest.mock('../rpc', () => {
  const validateRequest = jest.requireActual('../rpc').validateRequest;
  return {
    getExtendedPublicKey: jest.fn(),
    signPsbt: jest.fn(),
    masterFingerprint: jest.fn(),
    manageNetwork: jest.fn(),
    validateRequest,
  };
});

const wallet = new WalletMock();

describe('index', () => {
  beforeAll(() => {
    (global as any).wallet = wallet;
  });

  afterAll(() => {
    delete (global as any).wallet;
  });

  describe('validateRequest', () => {
    it('should throw error when given network not match for getExtendedPublicKey', async () => {
      await expect(onRpcRequest({
          origin: 'origin',
          request: {
            method: 'btc_getPublicExtendedKey',
            params: {
              network: BitcoinNetwork.Main,
              scriptType: ScriptType.P2PKH,
            },
          },
        }),
      ).rejects.toThrowError('Network not match');
    });

    it('should throw error when given network not match for signPsbt', async () => {
      await expect(onRpcRequest({
          origin: 'origin',
          request: {
            method: 'btc_getPublicExtendedKey',
            params: {
              network: BitcoinNetwork.Main,
              scriptType: ScriptType.P2PKH,
            },
          },
        }),
      ).rejects.toThrowError('Network not match');
    });
  });

  describe('rpc methods', function() {
    it('should call getExtendedPublicKey when method btc_getPublicExtendedKey get called', async () => {
      await onRpcRequest({
        origin: 'origin',
        request: {
          method: 'btc_getPublicExtendedKey',
          params: {
            network: BitcoinNetwork.Test,
            scriptType: ScriptType.P2PKH,
          },
        },
      });

      await expect(getExtendedPublicKey).toBeCalled();
    });

    it('should sign PSBT when method btc_signPSBT get called', async () => {
      await onRpcRequest({
        origin: 'origin',
        request: {
          method: 'btc_signPsbt',
          params: {
            psbt: '',
            network: BitcoinNetwork.Test,
            scriptType: ScriptType.P2WPKH,
          },
        },
      });

      await expect(signPsbt).toBeCalled();
    });

    it('should manage mfp when method btc_masterFingerprint get called', async () => {
      await onRpcRequest({
        origin: 'origin',
        request: {
          method: 'btc_masterFingerprint',
          params: {
            action: 'get',
          },
        },
      });

      await expect(masterFingerprint).toBeCalled();
    });

    it('should manage network when method btc_network get called', async () => {
      await onRpcRequest({
        origin: 'origin',
        request: {
          method: 'btc_network',
          params: {
            action: 'get',
          },
        },
      });

      await expect(manageNetwork).toBeCalled();
    });

    it('should throw error when given method not exist', async () => {
      await expect(onRpcRequest({
          origin: 'origin',
          request: {
            method: 'btc_method_not_exist' as any,
            params: {} as any,
          },
        }),
      ).rejects.toThrowError('Method not found.');
    });
  });
});
