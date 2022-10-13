import { useUtxo } from "../useUtxo";
import { renderHooksWithContext } from "../../__tests__/utils/renderHookWithContext";
import * as querySendInfo from "../../api/v1/sendInfo";
import * as fetchTransaction from "../../api/v1/fetchTransaction";
import { coinManager } from "../../services/CoinManager";

const sendInfo = {
  pending: [],
  spendables: [
    {
      "value": 1044775,
      "voutN": 1,
      "txid": "b63625ad933506f2551d927b6c8a668eee9cd11ad13bdeba6d47494f6425d5b5",
      "hdPath": "M/84'/1'/0'/1/11"
    }
  ],
  unusedChangeAddressHdPath: "M/84'/1'/0'/1/13"
}

const rawHex = '020000000001018b66fd49297a425692de87f80abba50f84b5b8f3b67b6b88d928212e87d588510100000000ffffffff021027000000000000160014fbd7badf24f96608f17b3e5162792b926c71c58127f10f0000000000160014658952c5bf0213b00f5c2cfd43e152a78d7f081a024730440220604183d6786c489f401c137c65cd81047ff70e160e721c0fd80f6651b798401d022044817f7455193c037263bd0e41668befa536aea0a27b1811ce5248898988beab012102d9a90b2dc77faf8f5b1750a524105d5741357b26e34b1343146240ab4ea15bf700000000'

describe('useUtxo', () => {
  beforeEach(() => {
    jest.spyOn(querySendInfo, 'querySendInfo').mockResolvedValue(Promise.resolve(sendInfo));
    jest.spyOn(fetchTransaction, 'fetchTransaction').mockResolvedValue(Promise.resolve(rawHex));
    jest.spyOn(coinManager, 'xpubToPubkey').mockReturnValue(Buffer.from('03143180085a7f7214452f9278e46ab52e11eb1ae2e4b709c52ccbc6268a298328', 'hex'));
    jest.spyOn(coinManager, 'deriveAddress').mockReturnValue('mvbktGx1tdmaCq9sT7yBenWADuHzJ2Uw83');
  })

  it("should return nextChange and utxoList from current", async () => {
    const {result, waitForNextUpdate} = renderHooksWithContext(() => useUtxo());
    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      nextChange: "M/84'/1'/0'/1/13",
      utxoList: [
        {
          transactionHash: 'b63625ad933506f2551d927b6c8a668eee9cd11ad13bdeba6d47494f6425d5b5',
          index: 1,
          address: expect.any(String),
          value: 1044775,
          path: "M/84'/1'/0'/1/11",
          pubkey: Buffer.from('03143180085a7f7214452f9278e46ab52e11eb1ae2e4b709c52ccbc6268a298328', 'hex'),
          rawHex: '020000000001018b66fd49297a425692de87f80abba50f84b5b8f3b67b6b88d928212e87d588510100000000ffffffff021027000000000000160014fbd7badf24f96608f17b3e5162792b926c71c58127f10f0000000000160014658952c5bf0213b00f5c2cfd43e152a78d7f081a024730440220604183d6786c489f401c137c65cd81047ff70e160e721c0fd80f6651b798401d022044817f7455193c037263bd0e41668befa536aea0a27b1811ce5248898988beab012102d9a90b2dc77faf8f5b1750a524105d5741357b26e34b1343146240ab4ea15bf700000000'
        }
      ],
    })
  })
})
