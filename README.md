# BitcoinSnap [![0.3.1](https://badge.fury.io/js/btcsnap.png)](https://badge.fury.io/js/btcsnap)

![./home.png](./home.png)

BitcoinSnap is the world's first application allowing users to directly manage Bitcoin within the MetaMask interface, without having to wrap tokens.
BitcoinSnap is currently live on [Metamask](https://metamask.io/).

##

### MetaMask Snaps Introduction
Snaps is a system that allows developers to safely build and expand the capabilities of MetaMask. It is a program that is run in an isolated environment with a limited set of capabilities, that can customize and modify MetaMask's wallet experience for end users. For example, a snap can add new APIs to MetaMask thus adding support for different blockchains or modify existing functionalities using internal APIs.

Additional information can be found [here](https://docs.metamask.io/guide/snaps.html).


##

### BitcoinSnap Integration
If you would like to integrate BitcoinSnap into your dapp, you can make use of our npm. Refer to the following document [here](https://github.com/snapdao/btcsnap/tree/master/packages/snap).

##

### How to start testing BitcoinSnap

1. Download [MetaMask](https://metamask.io/)
2. Head over to the [BitcoinSnap webpage](https://btc.justsnap.io), create a test wallet, connect it to MetMask and approve the installation of the BitcoinSnap app
3. Ensure you're connected to the 'Testnet' version of the app via settings
4. Request for some testnet Bitcoin via [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/) or [Bitcoinfaucet](https://bitcoinfaucet.uo1.net/) and start experimenting

Check out this [video](https://youtu.be/pQwZRfHpXtI) to see how BitcoinSnap works.

##

### How to run BitcoinSnap on a wallet locally

Navigate to the `example` folder under `packages`, launch our app locally by running:

```shell
yarn install && yarn start
```

## License

This project is dual-licensed under Apache 2.0 and MIT terms:
- [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](http://opensource.org/licenses/MIT)
