import React from "react";
import { Modal } from "semantic-ui-react"
import { TransitionablePortal } from "semantic-ui-react";
import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork } from "../../interface";
import CloseIcon from "../Icons/CloseIcon";
import NetworkIcon from "../Icons/Network";

import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  NetworkContainer,
  NetworkItem,
  NetworkItemLabel,
  NetworkItemRadio,
} from "./styles"


interface ConnectProps {
  open: boolean;
  close: () => void;
}

enum NetOptions {
  Mainnet,
  Testnet
}

const AddressType = (({open, close}: ConnectProps) => {
  const { settings: { network, setNetwork, scriptType }, current, switchToAccount} = useKeystoneStore();

  const onNetworkChecked  = (netValue: BitcoinNetwork) => {
    setNetwork(netValue);
    current && switchToAccount(current.mfp, scriptType, netValue);
    close();
  }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{width: '440px', marginTop: '384px', borderRadius: '20px'}}
      >
        <ModalHeader>
          <ModalHeaderContainer>
            <ModalHeaderLabel>Network</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close} />
        </ModalHeader>

        <NetworkContainer>
          <NetworkItem onClick={() => onNetworkChecked(BitcoinNetwork.Main)}>
            <NetworkItemLabel>
              <NetworkIcon network={BitcoinNetwork.Main}/>
              <span>Mainnet</span>
            </NetworkItemLabel>
            <NetworkItemRadio value={NetOptions.Mainnet} checked={network === BitcoinNetwork.Main} />
          </NetworkItem>

          <NetworkItem onClick={() => onNetworkChecked(BitcoinNetwork.Test)}>
            <NetworkItemLabel>
              <NetworkIcon network={BitcoinNetwork.Test} />
              <span>Testnet</span>
            </NetworkItemLabel>
            <NetworkItemRadio value={NetOptions.Testnet} checked={network === BitcoinNetwork.Test} />
          </NetworkItem>
        </NetworkContainer>

      </Modal>
    </TransitionablePortal>
  )
})

export default AddressType
