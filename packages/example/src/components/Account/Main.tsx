import React, { useCallback, useState } from 'react';
import {observer} from 'mobx-react-lite';
import Logo from "./image/logo.svg";
import LogoTestnet from "./image/logo-testnet.svg";
import Send from "./image/send.svg";
import { Modal } from "semantic-ui-react";
import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork } from "../../interface";

export interface MainProps {
  balance: number
  receiveAddress: string
}

const Main = observer(({balance, receiveAddress}: MainProps) => {
  const { global: { network }} = useKeystoneStore();
  const [showSendModal, setShowSendModal] = useState<boolean>(false)
  const [showReceiveModal, setShowReceiveModal] = useState<boolean>(false)

  const onSend = useCallback(() => {
    setShowSendModal(true);
  }, [setShowSendModal])

  const closeSendModal = useCallback(() => {
    setShowSendModal(false);
  }, [setShowSendModal])

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
          <div className="Action-container" onClick={onSend}>
            <div className="Action-button-container">
              <img src={Send} alt="Send" />
            </div>
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
        TODO change with SendModal
      */}
      <Modal
        onClose={closeSendModal}
        open={showSendModal}
      >
        <Modal.Header>
          Send
        </Modal.Header>
        <Modal.Content>
          WIP: Address to QR Code
        </Modal.Content>
      </Modal>

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
