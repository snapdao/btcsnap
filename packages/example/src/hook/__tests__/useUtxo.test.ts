import { useUtxo } from '../useUtxo';
import { renderHooksWithContext } from '../../__tests__/utils/renderHookWithContext';

const sendInfo = {
  pending: [
    {
      "value": 8000,
      "vout_n": 1,
      "txid": "162a2f7b919e7b6f4efe4642744d735d3fad63194d200047a7e061e8b51ba3a6",
      "hd_path": "M/84'/1'/0'/0/0"
    },
    {
      "value": 1725522,
      "vout_n": 0,
      "txid": "4c26b3bb8dd51efd0e3a661f91394c34db73f73e4554f6fc9768350a915f898d",
      "hd_path": "M/84'/1'/0'/0/1"
    }
  ],
  spendables: [
    {
      'value': 1520491,
      'voutN': 1,
      'txid': '0d0ad90145eb05bb58aa22c491ac145a0b40f4b167254e949830067916533fd7',
      'hdPath': 'M/84\'/1\'/0\'/1/0'
    }
  ],
  unusedChangeAddressHdPath: 'M/84\'/1\'/0\'/1/1'
};
const rawHex = '020000000001018b66fd49297a425692de87f80abba50f84b5b8f3b67b6b88d928212e87d588510100000000ffffffff021027000000000000160014fbd7badf24f96608f17b3e5162792b926c71c58127f10f0000000000160014658952c5bf0213b00f5c2cfd43e152a78d7f081a024730440220604183d6786c489f401c137c65cd81047ff70e160e721c0fd80f6651b798401d022044817f7455193c037263bd0e41668befa536aea0a27b1811ce5248898988beab012102d9a90b2dc77faf8f5b1750a524105d5741357b26e34b1343146240ab4ea15bf700000000';

jest.mock('../../api/v1/sendInfo', () => ({
  querySendInfo: jest.fn().mockResolvedValue(Promise.resolve(sendInfo))
}));
jest.mock('../../api/v1/fetchTransaction', () => ({
  fetchTransaction: jest.fn().mockResolvedValue(Promise.resolve(rawHex))
}));

describe('useUtxo', () => {

  it('should return nextChange and utxoList from current', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useUtxo());
    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      nextChange: 'M/84\'/1\'/0\'/1/1',
      utxoList: [
        {
          transactionHash: '0d0ad90145eb05bb58aa22c491ac145a0b40f4b167254e949830067916533fd7',
          index: 1,
          address: expect.any(String),
          value: 1520491,
          path: 'M/84\'/1\'/0\'/1/0',
          pubkey: Buffer.from('03aa041d89d66e03e83dfd45ac669a0335ef14168ae05d9e9d6692087f1ff888a7', 'hex'),
          rawHex: '020000000001018b66fd49297a425692de87f80abba50f84b5b8f3b67b6b88d928212e87d588510100000000ffffffff021027000000000000160014fbd7badf24f96608f17b3e5162792b926c71c58127f10f0000000000160014658952c5bf0213b00f5c2cfd43e152a78d7f081a024730440220604183d6786c489f401c137c65cd81047ff70e160e721c0fd80f6651b798401d022044817f7455193c037263bd0e41668befa536aea0a27b1811ce5248898988beab012102d9a90b2dc77faf8f5b1750a524105d5741357b26e34b1343146240ab4ea15bf700000000'
        }
      ],
      pendingValue: 1733522,
    });
  });
});
