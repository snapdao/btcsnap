import { renderHook, act } from '@testing-library/react-hooks';
import { useBalance } from "../useBalance";
import { renderHooksWithContext } from '../../__tests__/utils/renderHookWithContext';
import * as queryCoinV1 from "../../api/v1/coin";
import * as queryCoinV2 from "../../api/v2/coin";

const coinsV1 = {
  coins: {
    BTC_TESTNET_NATIVE_SEGWIT: {
      coinInfo: {
        assetCoin: "BTC_TESTNET_NATIVE_SEGWIT",
        chainCoin: "BTC_TESTNET" as any,
        name: "Bitcoin Testnet Native Segwit",
        decimal: 8,
        rate: "19056.42",
      }
    }
  }
}

const coinsV2 = {
  coins: {
    BTC_TESTNET_NATIVE_SEGWIT:
    {
      decimal: 8,
      balance: "0"
    }
  }
}


describe('useBalance', () => {

  it('should return balance from current account', async() => {
    jest.spyOn(queryCoinV1, 'queryCoinV1').mockResolvedValue(coinsV1 as any);
    jest.spyOn(queryCoinV2, 'queryCoinV2').mockResolvedValue(coinsV2 as any);


    const {result, waitForNextUpdate} = renderHooksWithContext(() => useBalance());
    await waitForNextUpdate();
    expect(result.current).toMatchObject({
      balance: 0,
      rate: 19056.42,
    })
  })

  it('should refresh balance', async() => {
    jest.spyOn(queryCoinV1, 'queryCoinV1').mockResolvedValue(coinsV1 as any);
    jest.spyOn(queryCoinV2, 'queryCoinV2').mockResolvedValue(coinsV2 as any);

    const {result, waitForNextUpdate} = renderHooksWithContext(useBalance);
    await waitForNextUpdate();
    expect(queryCoinV1.queryCoinV1).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    })
    await waitForNextUpdate();
    expect(queryCoinV1.queryCoinV1).toBeCalledTimes(2);
  })
})
