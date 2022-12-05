import React, { useEffect, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import { TransitionablePortal, Loader } from 'semantic-ui-react';
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


interface ConnectProps {
  open: boolean;
  close: () => void;
}

enum NetOptions {
  Mainnet,
  Testnet
}

const AddressType = (({open, close}: ConnectProps) => {
  const { settings: { network, setNetwork, scriptType }, current, getAccountBy, switchToAccount, runtime: { setStatus }} = useAppStore();
  const [isSwitchNetWork, setIsSwitchNetWork] = useState<boolean>(false);
  const radioMainChecked = network === BitcoinNetwork.Main;
  const radioTestChecked = network === BitcoinNetwork.Test;

  useEffect(() => {
    setIsSwitchNetWork(false);
  }, []);

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

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{width: 440, marginTop: isSwitchNetWork ? 0 : 424, borderRadius: 20, position: 'relative'}}
      >
        {isSwitchNetWork ?
          <><Loader /></> :
          <>
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
          </>
        }
      </Modal>
    </TransitionablePortal>
  );
});

export default AddressType;
