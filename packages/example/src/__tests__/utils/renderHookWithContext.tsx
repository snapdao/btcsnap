import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MobxStoreProvider } from '../../mobx';
import { WalletType } from '../../interface';

export const defaultStore = {
  current: {
    id: 'account-d2ecd721-8701-4302-af95-925f1bbfde44',
    mfp: '9ad305ed',
    xpub: 'vpub5YhdkS7xj455LHGimihBnHp8drkeaSei2uKWe9Kg1a2MKgzMDAcpj8poDo9LT5pCjuUBnvBUKv9gYDqvTKkjLhgDkRATWCVwWcUwxq4NKP7',
    path: 'M/84\'/1\'/0\'',
    coinCode: 'BTC_TESTNET_NATIVE_SEGWIT',
    addresses: [
      {
        id: 'address-3b5d46ef-de3b-4f69-8290-0c7712ba5267',
        address: 'tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut',
        parent: 'account-d2ecd721-8701-4302-af95-925f1bbfde44',
        coinCode: 'BTC_TESTNET_NATIVE_SEGWIT',
        change: 0,
        index: 2,
      },
      {
        id: 'address-901320c0-b725-436a-ba2b-a27b34fb3b7e',
        address: 'tb1q354448qxp88ph0pgmp3rm29098hm60hkklntjv',
        parent: 'account-d2ecd721-8701-4302-af95-925f1bbfde44',
        coinCode: 'BTC_TESTNET_NATIVE_SEGWIT',
        change: 0,
        index: 3,
      },
    ],
    scriptType: 'P2WPKH',
    network: 'testnet',
    receiveAddressIndex: 3,
    hasSyncXPub: true,

    persistDataLoaded: true,
    receiveAddress: {
      id: 'address-3b5d46ef-de3b-4f69-8290-0c7712ba5267',
      address: 'tb1ql0tm4heyl9nq3utm8egky7ftjfk8r3vpaxlsut',
      parent: 'account-d2ecd721-8701-4302-af95-925f1bbfde44',
      coinCode: 'BTC_TESTNET_NATIVE_SEGWIT',
      change: 0,
      index: 2,
    },
    validateAndAddAddress: jest.fn(),
    loadMoreTxs: jest.fn(),
  },
  settings: { dynamicAddress: true },
  runtime: {
    setStatus: jest.fn(),
    setCurrencyRate: jest.fn(),
    getWallet: jest.fn(),
    setBalanceForWallet: jest.fn(),
  },
  refresh: jest.fn(),
  currentWalletType: WalletType.BitcoinWallet,
  lightning: {
    current: {
      id: 'ln-wallet-89738820-fb7a-4acd-ab20-19b4c0578d4e',
      userId:
        '71ac9d4969b14f19fc9d9254f86156f604d84e6926b55afc342d5311750fe900',
      name: 'Lightning',
      unit: 'sats',
    },
    nextWalletName: 'sdkasiofoifasl',
  },
};

export function renderHooksWithContext<T>(hook: () => T, store = defaultStore) {
  const wrapper = ({ children }: any) => (
    <MobxStoreProvider value={store as any}>{children}</MobxStoreProvider>
  );

  return renderHook(hook, { wrapper });
}
