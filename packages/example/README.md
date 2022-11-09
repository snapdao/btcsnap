# BitcoinSnap

The world's first application allowing users to directly manage Bitcoin within the MetaMask interface, without having to wrap it.
The application is currently live on [Metamask Flask](https://metamask.io/flask/) only.

*Note: MetaMask Flask is an experimental playground for developers and is not to be confused with the normal [MetaMask wallet app](https://metamask.io/).

## How to start testing BitcoinSnap

1. Create a new browser profile or disable/uninstall any existing versions of Metamask
2. Download [MetaMask Flask](https://metamask.io/flask/)
3. Head over to the [BitcoinSnap webpage](https://btc.justsnap.io), create a test wallet, connect it to MetMask Flask and approve the installation of the BitcoinSnap app 
4. Ensure you're connected to the 'Testnet' version of the app via settings
5. Request for some testnet Bitcoin via [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/) or [Bitcoinfaucet](https://bitcoinfaucet.uo1.net/) and start experimenting


Check out this [video](https://youtu.be/pQwZRfHpXtI) to see how BitcoinSnap works.

*Note: MetaMask Flask is an experimental playground for developers and is not to be confused with the normal MetaMask wallet app. Running multiple instances of MetaMask in the same browser profile will break all dapp interaction. 

## How to build the application locally

### Start

```
yarn start
```

*Note: Please make sure you already have Metamask Flask installed.


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
