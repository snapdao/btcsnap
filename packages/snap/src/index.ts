import {Wallet} from './interface'

declare let wallet: Wallet;

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
    switch (requestObject.method) {
      case 'btc_getPublicExtendedKey':
        return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: `Hello, ${originString}!`,
              description:
                'This function will give your public extended key, please confirm',
              textAreaContent:
                'your extended public key'
            },
          ],
        });
      default:
        throw new Error('Method not found.');
    }
  });
  