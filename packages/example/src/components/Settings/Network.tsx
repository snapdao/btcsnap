import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../mobx';
import { BitcoinNetwork } from '../../interface';
import CloseIcon from '../Icons/CloseIcon';
import NetworkIcon from '../Icons/Network';
import { updateNetworkInSnap } from '../../lib/snap';
import { AppStatus } from '../../mobx/runtime';
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  NetworkContainer,
  NetworkItem,
  NetworkItemLabel,
  NetworkItemRadio,
} from './styles';
import { Modal } from '../../kits/index';


interface ConnectProps {
  open: boolean;
  close: () => void;
  parentNode: HTMLElement 
}

enum NetOptions {
  Mainnet,
  Testnet
}

const Network = (({ open, close, parentNode }: ConnectProps) => {
  const { settings: { network, setNetwork, scriptType }, current, getAccountBy, switchToAccount, runtime: { setStatus } } = useAppStore();
  const [isSwitchNetWork, setIsSwitchNetWork] = useState<boolean>(false);
  const radioMainChecked = network === BitcoinNetwork.Main;
  const radioTestChecked = network === BitcoinNetwork.Test;

  useEffect(() => {
    setIsSwitchNetWork(false);
    return () => {
      setIsSwitchNetWork(false);
    };
  }, [open]);

  const onNetworkChecked = (netValue: BitcoinNetwork) => {
    if(netValue === network) {
      return;
    }
    setIsSwitchNetWork(true);
    updateNetworkInSnap(netValue)
      .then((targetNetwork) => {
        if(targetNetwork) {
          setNetwork(netValue);
          current && switchToAccount(current.mfp, scriptType, netValue);
          if(current && !!getAccountBy(current.mfp, scriptType, netValue)) {
            setStatus(AppStatus.FetchBalance);
          } else {
            setStatus(AppStatus.Connect);
          }
        }
        close();
      }).catch(() => {
        close();
      });
  };

  if (!isSwitchNetWork && !parentNode) return null;

  return isSwitchNetWork ?
    <Modal.Loading inModal={false} content='Continue at MetaMask'/> :
    parentNode && <Modal
      open={open}
      style={{ width: 440, marginTop: 425, height: 215, borderRadius: 20 }}
      mountNode={parentNode}
    >
      <ModalHeader>
        <ModalHeaderContainer>
          <ModalHeaderLabel>Network</ModalHeaderLabel>
        </ModalHeaderContainer>
        <CloseIcon onClick={close} />
      </ModalHeader>

      <NetworkContainer>
        <NetworkItem
          onClick={() => onNetworkChecked(BitcoinNetwork.Main)} checked={radioMainChecked}>
          <NetworkItemLabel>
            <NetworkIcon network={BitcoinNetwork.Main}/>
            <span>Mainnet</span>
          </NetworkItemLabel>
          <NetworkItemRadio value={NetOptions.Mainnet} checked={radioMainChecked} />
        </NetworkItem>

        <NetworkItem onClick={() => onNetworkChecked(BitcoinNetwork.Test)} checked={radioTestChecked}>
          <NetworkItemLabel>
            <NetworkIcon network={BitcoinNetwork.Test} />
            <span>Testnet</span>
          </NetworkItemLabel>
          <NetworkItemRadio value={NetOptions.Testnet} checked={radioTestChecked} />
        </NetworkItem>
      </NetworkContainer>
    </Modal>
  ;
});

export default Network;
