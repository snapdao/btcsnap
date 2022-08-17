import React, { useCallback, useState } from 'react';
import {observer} from 'mobx-react-lite';
import { Modal } from "semantic-ui-react";

import { useKeystoneStore } from "../../mobx";
import {BitcoinNetwork, Utxo} from "../../interface";
import SendModal from '../SendModal';

import Logo from "./image/logo.svg";
import LogoTestnet from "./image/logo-testnet.svg";
import Send from "./image/send.svg";
import {SendInfo} from "../../lib";


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
            <div className="Action-button-container rotate">
              <img src={Send} alt="Receive" />
            </div>
            <p>receive</p>
          </div>
        </div>
      </div>
      {/*
      TODO change with ReceiveModal
    */}
      <Modal
          onClose={closeReceiveModal}
          open={showReceiveModal}
      >
        <Modal.Header>
          Receive
        </Modal.Header>
        <Modal.Content>
          WIP: address: {receiveAddress} to QR Code
        </Modal.Content>
      </Modal>
    </div>
  );
});

export default Main;
