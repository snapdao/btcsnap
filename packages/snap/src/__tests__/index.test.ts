import { onRpcRequest } from '../index';
import { getExtendedPublicKey, signPsbt, getMasterFingerprint, manageNetwork, validateRequest, saveLNDataToSnap, signLNInvoice, getLNDataFromSnap } from '../rpc';
import { BitcoinNetwork, KeyOptions, ScriptType } from '../interface';
import { SnapMock } from '../rpc/__mocks__/snap';
import { LNDataToSnap } from '../rpc/__tests__/fixtures/bitcoinNode';

jest.mock('../utils/manageState', () => ({
  getPersistedData: jest.fn().mockResolvedValue('test'), // network
}));

jest.mock('../rpc', () => {
  const validateRequest = jest.requireActual('../rpc').validateRequest;
  return {
    getExtendedPublicKey: jest.fn(),
    signPsbt: jest.fn(),
    getMasterFingerprint: jest.fn(),
    manageNetwork: jest.fn(),
    validateRequest,
    saveLNDataToSnap: jest.fn(),
    signLNInvoice: jest.fn(),
    getLNDataFromSnap: jest.fn()
  };
});

const snap = new SnapMock();
const domain = "www.justsnap.io"

describe('index', () => {
  beforeAll(() => {
    (global as any).snap = snap;
  });

  afterAll(() => {
    delete (global as any).snap;
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

    it('should throw error if domain not allowed', async() => {
      await expect(onRpcRequest({
        origin: 'origin',
        request: {
          method: 'btc_getLNDataFromSnap',
          params: {
            walletId: LNDataToSnap.walletId,
            key: KeyOptions.Credential
          },
        },
      }),
    ).rejects.toThrowError('Domain not allowed');
    })
  });

  describe('rpc methods', function() {
    it('should call getExtendedPublicKey when method btc_getPublicExtendedKey get called', async () => {
      await onRpcRequest({
        origin: domain,
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
        origin: domain,
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

    it('should return mfp when method btc_getMasterFingerprint get called', async () => {
      await onRpcRequest({
        origin: domain,
        request: {
          method: 'btc_getMasterFingerprint',
        },
      });

      await expect(getMasterFingerprint).toBeCalled();
    });

    it('should manage network when method btc_network get called', async () => {
      await onRpcRequest({
        origin: domain,
        request: {
          method: 'btc_network',
          params: {
            action: 'get',
          },
        },
      });

      await expect(manageNetwork).toBeCalled();
    });

    it('should manage network when method btc_saveLNDataToSnap get called', async () => {
      await onRpcRequest({
        origin: domain,
        request: {
          method: 'btc_saveLNDataToSnap',
          params: {
            walletId: LNDataToSnap.walletId,
            credential: LNDataToSnap.credential,
            password: LNDataToSnap.password
          }
        },
      });

      await expect(saveLNDataToSnap).toBeCalled();
    });

    it('should manage network when method btc_getLNDataFromSnap get called', async () => {
      await onRpcRequest({
        origin: domain,
        request: {
          method: 'btc_getLNDataFromSnap',
          params: {
            walletId: LNDataToSnap.walletId,
            key: KeyOptions.Credential
          }
        },
      });

      await expect(getLNDataFromSnap).toBeCalled();
    });

    it('should manage network when method btc_signLNInvoice get called', async () => {
      await onRpcRequest({
        origin: domain,
        request: {
          method: 'btc_signLNInvoice',
          params: {
            invoice: LNDataToSnap.invoice
          }
        },
      });

      await expect(signLNInvoice).toBeCalled();
    });

    it('should throw error when given method not exist', async () => {
      await expect(onRpcRequest({
          origin: domain,
          request: {
            method: 'btc_method_not_exist' as any,
            params: {} as any,
          },
        }),
      ).rejects.toThrowError('Method not found.');
    });
  });
});
