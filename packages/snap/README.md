# `btcsnap`

[![0.3.1](https://badge.fury.io/js/btcsnap.png)](https://badge.fury.io/js/btcsnap)

btcsnap help you manage your bitcoin on Metamask Flask

## Snap Introducion
For more about snap, please fellow metamask snap guide [here](https://docs.metamask.io/guide/snaps.html)

### Usage

1. Enable this snap on your dapp

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

2. get extended your extended public keys

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

3. sign Psbt

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

For Build the snap and test your snap locally please run

```
yarn rebuild
```

### Test

For run all tests run the following command:
```
yarn test
```

## Live Example

If you would like to use this snap on your dapp, you can follow the code on [here](https://github.com/KeystoneHQ/btcsnap/tree/master/packages/example)
