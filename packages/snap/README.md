# `Zion`

[![0.3.1](https://badge.fury.io/js/btcsnap.png)](https://badge.fury.io/js/btcsnap)

`Zion` is the world's first application allowing users to directly manage Bitcoin within the MetaMask interface,
without having to wrap tokens. Zion is currently live on [Metamask](https://metamask.io/).

## MetaMask Snaps Introduction
Snaps is a system that allows developers to safely build and expand the capabilities of MetaMask.
It is a program that is run in an isolated environment with a limited set of capabilities,
that can customize and modify MetaMask's wallet experience for end users.
For example, a snap can add new APIs to MetaMask thus adding support for different blockchains
or modify existing functionalities using internal APIs.

Additional information can be found [here](https://docs.metamask.io/guide/snaps.html).

### Usage

1. Enable `btcsnap` in your dapp

```ts
const result: boolean = await ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    "npm:btcsnap": {},
  }
})
```

2. Get an extended public key

```ts
const response = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: "npm:btcsnap",
    request: {
      method: 'btc_getPublicExtendedKey',
      params: {
        network: "test",
        scriptType: "P2WPKH"
      },
    }
  }
})
```

3. Sign Psbt

```ts
const result: { txId:string, txHex:string } = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: "npm:btcsnap",
    request: {
      method: 'btc_signPsbt',
      params: {
        psbt: base64Psbt, // base64 string for the pbst,
        network: "Main", // for testnet use "Test",
        scriptType: "P2PKH" // "P2SH-P2WPKH" or "P2WPKH"
      },
    },
  }
})
```


### Building

Build the snap and test it locally with the following command:

```shell
yarn rebuild
```

### Testing

Use the following command to run tests:

```shell
yarn test
```

#### Testing Coverage

| File       | % Stmts | % Branch | % Funcs | % Lines |
|------------|---------|----------|---------|---------|
| All files  |    97.67 |    91.46 |     100 | 97.61   |

## Live Example

If you would like to integrate `btcsnap` into your dapp, you can use the following codes [here](https://github.com/snapdao/btcsnap/tree/master/packages/example).
