# `BitcoinSnap`

[![0.3.1](https://badge.fury.io/js/btcsnap.png)](https://badge.fury.io/js/btcsnap)

`BitcoinSnap` is the world's first application allowing users to directly manage Bitcoin within the MetaMask interface, without having to wrap it.
The Alpha version of the application is currently live on [Metamask Flask](https://metamask.io/flask/) only.

*Note: MetaMask Flask is an experimental playground for developers and is not to be confused with the normal [MetaMask wallet app](https://metamask.io/).

## MetaMask Snap Introducion
Snap is a system that allows developers to safely build and expand the capabilities of MetaMask. It is a program that is run in an isolated environment with a limited set of capabilities, that can customize and modify MetaMask's wallet experience for end users. For example, a snap can add new APIs to MetaMask thus adding support for different blockchains or modify existing functionalities using internal APIs.

Additional information can be found [here](https://docs.metamask.io/guide/snaps.html).

### Usage

1. Enable `BitcoinSnap` in your dapp

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

2. Get an extended public key

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


### Building

Build the snap and test it locally with the following command:

```
yarn rebuild
```

### Testing

Use the following command to run test transactions:
```
yarn test
```

## Live Example

If you would like to integrate BitcoinSnap into your dapp, you can use the following codes [here](https://github.com/KeystoneHQ/btcsnap/tree/master/packages/example).
