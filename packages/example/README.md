# Zion

The world's first application allowing users to directly manage Bitcoin within the MetaMask interface, without having to wrap it.
The application is currently live on [Metamask](https://metamask.io/) only.

## How to start testing Zion

1. Download [MetaMask](https://metamask.io/)
2. Head over to the [Zion webpage](https://btc.justsnap.io), create a test wallet, connect it to MetMask and approve the installation of the `btcsnap`
3. Ensure you're connected to the 'Testnet' version of the app via settings
4. Request for some testnet Bitcoin via [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/) or [Bitcoinfaucet](https://bitcoinfaucet.uo1.net/) and start experimenting

Check out this [video](https://youtu.be/pQwZRfHpXtI) to see how Zion works.

## How to build the application locally

### Start

```
yarn start
```

*Note: Please make sure you already have Metamask installed.

### Test

```
yarn test
```

Launches the test runner in the interactive watch mode.\
Refer to the following [article](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build

```
yarn build
```

Prepares the app for production in the `build` folder.\
It correctly bundles React in production mode and optimizes the best performance for the build.

The build is minified and the filenames are included in the hashes.\
Your app is ready to be deployed!


## Audit Report

[Audited by SlowMist](https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20BTCSnap_en-us.pdf)
