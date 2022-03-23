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


type HeaderProps = {
  setConnectStaus: (status: boolean) => void;
  connected: boolean;
}

export const Header = (props: HeaderProps) => {
    const {setConnectStaus, connected} = props
    const connectWallet = async () => {
      try {
        await connect();
        setConnectStaus(true);
      } catch (e) {
        setConnectStaus(false)
      }
    }
    return (
        <div>
            {connected ?<button onClick={connectWallet}> Connect Wallet</button> : <div>connected</div> }
        </div>
    )
}