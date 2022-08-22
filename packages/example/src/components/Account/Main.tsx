import React, { useCallback, useState } from 'react';
import {observer} from 'mobx-react-lite';

import { useKeystoneStore } from "../../mobx";
import {BitcoinNetwork, Utxo} from "../../interface";
import SendModal from '../SendModal';
import ReceiveModal from '../ReceiveModal'

import Logo from "./image/logo.svg";
import LogoTestnet from "./image/logo-testnet.svg";
import {SendInfo} from "../../lib";
import ReceiveIcon from "../Icons/ReceiveIcon";


export interface MainProps {
  balance: number
  receiveAddress: string
  utxos: Utxo[],
  sendInfo?: SendInfo,
}

const Main = observer(({balance, receiveAddress, utxos, sendInfo}: MainProps) => {
  const { global: { network }} = useKeystoneStore();
  const [showReceiveModal, setShowReceiveModal] = useState<boolean>(false)

  const onReceive = useCallback(() => {
    setShowReceiveModal(true)
  }, [setShowReceiveModal]);

  const closeReceiveModal = useCallback(() => {
    setShowReceiveModal(false)
  }, [setShowReceiveModal]);

  return (
    <div className="Account-Main">
      <div className="Account-Main-Container">
        <div className="Logo-container">
          <img src={network === BitcoinNetwork.Main ? Logo : LogoTestnet} alt="BitcoinSnap" className="Logo-img" />
          <span className="Logo-label">Alpha</span>
        </div>
        <div className="Balance-container">
          <p className="Balance-label">current balance</p>
          <p className="Balance">{balance} BTC</p>
        </div>
        <div>
          <div className="Action-container">
            <SendModal network={network} utxos={utxos} sendInfo={sendInfo} />
            <p>send</p>
          </div>
          <div className="Action-container" onClick={onReceive}>
            <button className="Action-button-container">
              <ReceiveIcon size={48} />
            </button>
            <p>receive</p>
          </div>
        </div>
      </div>
      <ReceiveModal address={receiveAddress} open={showReceiveModal} close={closeReceiveModal}/>
    </div>
  );
});

export default Main;
