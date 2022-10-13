import { useReceiveAddress } from "../useReceiveAddress";
import { renderHook, act } from '@testing-library/react-hooks';
import * as fetchAddresses from "../../api/v1/fetchAddress";
import { renderHooksWithContext, defaultStore } from "../../__tests__/utils/renderHookWithContext";
import * as mfpCheck from "../useMFPCheck";

const address = {
  used: [
    {
      address: "tb1q3vdxjy5qrg3wkftxu0vt87ncvdlwp5ygjm08ep",
      hdPath: "M/84'/1'/0'/1/0"
    },
    {
      address: "tb1qscef8f59lnkas34w9zwuzztaprgh5z47hghy52",
      hdPath: "M/84'/1'/0'/1/1"
    }
  ],
  occupied: [
    {
      address: "tb1qvky493dlqgfmqr6u9n758c2j57xh7zq6kv9k94",
      balance: "1044775",
      hdPath: "M/84'/1'/0'/1/11"
    },
    {
      address: "tb1qc437chw3mm5rahxzt2573y4qq4y77tk5m5dph7",
      balance: "1992768",
      hdPath: "M/84'/1'/0'/1/12"
    }],
    unused: [{
      address: "tb1q4j2urfcy8ny6uklf50n9xtyef30zxffs4vcshv",
      hdPath: "M/84'/1'/0'/0/13"
    },
    {
      address: "tb1qtm44j64fhd5249tntd2ke02n4pvk5278z2sswl",
      hdPath: "M/84'/1'/0'/1/14"
    }
  ],
}

describe('useReceiveAddress', () => {

  beforeEach(() => {
    jest.spyOn(fetchAddresses, 'fetchAddresses').mockResolvedValue(Promise.resolve(address));
    jest.spyOn(mfpCheck, 'useMFPCheck').mockReturnValue({isChecking: false, isSameMFP: true});
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('dynamicAddress', () => {
    it("should return address and path from remote api", async() => {
      const store  = {
        ...defaultStore,
        settings: { dynamicAddress: false},
        current: {
          ...defaultStore.current,
          getReceiveAddress: jest.fn().mockReturnValue({
            "id": "address-3b5d46ef-de3b-4f69-8290-0c7712ba5267",
            "address": "tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut",
            "parent": "account-d2ecd721-8701-4302-af95-925f1bbfde44",
            "coinCode": "BTC_TESTNET_NATIVE_SEGWIT",
            "change": 0,
            "index": 2
          })
        }
      }

      const {result} = renderHooksWithContext(() => useReceiveAddress(), store);

      expect(result.current).toEqual({
        loading: false,
        address: "tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut",
        path: "M/0/2",
      })
    })
  })


  describe('stateAddress', () => {

    it("should return address and path from current account", async() => {
      const store  = {
        ...defaultStore,
        settings: { dynamicAddress: false},
        current: {
          ...defaultStore.current,
          getReceiveAddress: jest.fn().mockReturnValue({
            "id": "address-3b5d46ef-de3b-4f69-8290-0c7712ba5267",
            "address": "tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut",
            "parent": "account-d2ecd721-8701-4302-af95-925f1bbfde44",
            "coinCode": "BTC_TESTNET_NATIVE_SEGWIT",
            "change": 0,
            "index": 2
          })
        }
      }
      const {result} = renderHooksWithContext(() => useReceiveAddress(), store);

      expect(result.current).toEqual({
        loading: false,
        address: "tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut",
        path: "M/0/2",
      })
      expect(fetchAddresses.fetchAddresses).not.toBeCalled();
    })
  })


  it("should return null when current does not exist ", () => {
    expect({}).toMatchObject({})
  })
})
