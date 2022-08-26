# `btcsnap`

[![0.3.1](https://badge.fury.io/js/btcsnap.png)](https://badge.fury.io/js/btcsnap)

`btcsnap` helps you manage your bitcoin on Metamask Flask.

## Snap Introduction
For more about snap, please fellow metamask snap guide [here](https://docs.metamask.io/guide/snaps.html)

### Usage

1. Enable `btcsnap` in your dapp.

```
const result: boolean = await ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: { "npm:btcsnap": {} },
      },
    ],
  });
```

2. Get extended public key

```
const result: string = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      "npm:btcsnap",
      {
        method: 'btc_getPublicExtendedKey',
        params: {
          network: "Main" // for testnet use "Test" ,
        },
      },
    ],
  });
```

3. Sign Psbt

```
const result: { txId:string, txHex:string } = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_signPsbt',
          params: {
            psbt: base64Psbt // base64 string for the pbst,
            network: "Main" // for testnet use "Test",
          },
        },
      ],
    })
```


### Build

Building the snap and testing locally with

```
yarn rebuild
```

### Test

Running all test cases by running following command
```
yarn test
```

## Live Example

If you would like to use this snap in your dapp, you can follow the code [here](https://github.com/KeystoneHQ/btcsnap/tree/master/packages/example)
