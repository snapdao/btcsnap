import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;

export async function connect(cb: Function) {
  const result = await ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: { 'npm:btcsnap': {} },
      },
    ],
  });

  console.log(result);
  if (result) {
    cb();
  }
}
