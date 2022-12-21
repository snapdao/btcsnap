import { useReceiveAddress } from '../useReceiveAddress';
import * as fetchAddresses from '../../api/v1/fetchAddress';
import { renderHooksWithContext, defaultStore } from '../../__tests__/utils/renderHookWithContext';

const address = {
  used: [
    {
      address: 'tb1q3vdxjy5qrg3wkftxu0vt87ncvdlwp5ygjm08ep',
      hdPath: 'M/84\'/1\'/0\'/1/0'
    },
    {
      address: 'tb1qscef8f59lnkas34w9zwuzztaprgh5z47hghy52',
      hdPath: 'M/84\'/1\'/0\'/1/1'
    }
  ],
  occupied: [
    {
      address: 'tb1qvky493dlqgfmqr6u9n758c2j57xh7zq6kv9k94',
      balance: '1044775',
      hdPath: 'M/84\'/1\'/0\'/1/11'
    },
    {
      address: 'tb1qc437chw3mm5rahxzt2573y4qq4y77tk5m5dph7',
      balance: '1992768',
      hdPath: 'M/84\'/1\'/0\'/1/12'
    }],
  unused: [{
    address: 'tb1q4j2urfcy8ny6uklf50n9xtyef30zxffs4vcshv',
    hdPath: 'M/84\'/1\'/0\'/0/13'
  },
  {
    address: 'tb1qtm44j64fhd5249tntd2ke02n4pvk5278z2sswl',
    hdPath: 'M/84\'/1\'/0\'/1/14'
  }
  ],
};

jest.mock('../../api/v1/fetchAddress', () => ({
  fetchAddresses: jest.fn().mockResolvedValue(Promise.resolve(address))
}));
jest.mock('../useMFPCheck', () => ({
  useMFPCheck: jest.fn().mockReturnValue({
    isChecking: false,
    isSameMFP: true
  })
}));

describe('useReceiveAddress', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('dynamicAddress', () => {
    it('should return address and path from remote api', async() => {
      const store  = {
        ...defaultStore,
        settings: { dynamicAddress: false },
        current: {
          ...defaultStore.current
        }
      };

      const { result } = renderHooksWithContext(() => useReceiveAddress(), store);

      expect(result.current).toEqual({
        loading: false,
        address: 'tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut',
        path: 'M/0/2',
      });
    });
  });


  describe('stateAddress', () => {

    it('should return address and path from current account', async() => {
      const store  = {
        ...defaultStore,
        settings: { dynamicAddress: false },
        current: {
          ...defaultStore.current
        }
      };
      const { result } = renderHooksWithContext(() => useReceiveAddress(), store);

      expect(result.current).toEqual({
        loading: false,
        address: 'tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut',
        path: 'M/0/2',
      });
      expect(fetchAddresses.fetchAddresses).not.toBeCalled();
    });
  });


  it('should return empty address when current does not exist ', () => {
    const store = {
      current: undefined,
      settings: { dynamicAddress: true }
    };
    const { result } = renderHooksWithContext(() => useReceiveAddress(), store as any);
    expect(result.current).toMatchObject({
      address: '',
      path: ''
    });
  });
});
