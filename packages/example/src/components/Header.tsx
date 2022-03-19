import React from 'react';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window
const snapId = "npm:btcsnap"

async function connect () {
    await ethereum.request({
      method: 'wallet_enable',
      params: [{
        wallet_snap: { 'npm:btcsnap': {} },
      }]
    })
  }


export const Header = () => {
    return (
        <div>
            <button onClick={connect}> Connect Wallet</button>
        </div>
    )
}