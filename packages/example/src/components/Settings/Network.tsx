import { useState } from "react";
import { Modal } from "semantic-ui-react"
import { TransitionablePortal } from "semantic-ui-react";
import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork } from "../../interface";
import { getStoredGlobalData, updateStoredNetwork } from "../../lib/globalStorage";
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
  const { global: { network, updateNetwork, updateBip44Xpub }} = useKeystoneStore();
  const [netValue, setNetValue] = useState<BitcoinNetwork>(network);

  const changeNetwork = () => {
    const targetNetwork = network === BitcoinNetwork.Main ? BitcoinNetwork.Test : BitcoinNetwork.Main
    updateNetwork(targetNetwork);
    const globalData = getStoredGlobalData()
    updateBip44Xpub(globalData.xpub[targetNetwork]);
    updateStoredNetwork(targetNetwork);
  }

  const onNetworkChecked  = (netValue: BitcoinNetwork) => {
    setNetValue(netValue);
    changeNetwork();
    close();
  }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'slide up', duration: '300' }}
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
            <NetworkItemRadio value={NetOptions.Mainnet} checked={netValue === BitcoinNetwork.Main} />
          </NetworkItem>

          <NetworkItem onClick={() => onNetworkChecked(BitcoinNetwork.Test)}>
            <NetworkItemLabel>
              <NetworkIcon network={BitcoinNetwork.Test} />
              <span>Testnet</span>
            </NetworkItemLabel>
            <NetworkItemRadio value={NetOptions.Testnet} checked={netValue === BitcoinNetwork.Test} />
          </NetworkItem>
        </NetworkContainer>

      </Modal>
    </TransitionablePortal>
  )
})

export default AddressType
