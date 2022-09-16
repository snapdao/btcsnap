import React, { useState } from 'react';
import { Container, Modal, Popup } from 'semantic-ui-react';
import './index.css';
import ReceiveIcon from "../Icons/ReceiveIcon"
import { ReactComponent as Checked } from '../../assets/vector.svg'
import AddressBox from './AddressBox';
import { Utxo } from '../../interface';
import CloseIcon from "../Icons/CloseIcon";
import InfoIcon from "../Icons/InfoIcon";
import {
  ReceiveContainer,
  AddressPathContainer,
} from "./styles"
import { observer } from "mobx-react-lite";
import { useReceiveAddress } from "../../hook/useReceiveAddress";

type ReceiveModalProps = {
  close: () => void;
};

const ReceiveModal = observer(({close}: ReceiveModalProps) => {
  const { address } = useReceiveAddress();
  const [addressCopied, setAddressCopy] = useState<boolean>(false);
  const addressPathTips = 'To ensure maximum privacy, we generate a new Bitcoin address each time a deposit is received. You can disable this functionality and remain with a static address via settings.'

  const copyAddress = () => {
    if(address) {
      navigator.clipboard.writeText(address).then(function() {
        setAddressCopy(true);
        setTimeout(() => {
          setAddressCopy(false)
        },1500)
      });
    }
  }

  return (
    <Modal
      style={{width: 440, height:640, borderRadius: '20px', position: 'relative'}}
      open={true}
    >
      <ReceiveContainer>
        <div className={'modal-header'}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ReceiveIcon size={36} />
            <span style={{marginLeft: 4, fontWeight: 600}}>RECEIVE</span>
          </span>
          <CloseIcon onClick={close} />
        </div>
        <AddressBox address={address} />
        <AddressPathContainer>
          <span>Address Path:</span>
          <span>M/1/0</span>
          <Popup
            position='top center'
            content={addressPathTips}
            inverted
            trigger={<div><InfoIcon /></div>}
          />
        </AddressPathContainer>
      </ReceiveContainer>

      <Container className={address ? 'modal-content-container' : 'reveive-none'}>
        <button
          className={'receive-action-button action-button-primary'}
          onClick={copyAddress}>
          Copy Address
        </button>
      </Container>

      {addressCopied &&
        <div className={'addressCopied-message'}>
          <Checked className={'addressCopied-message-icon'} />
          <span className={'addressCopied-message-span'}>Copied to clipboard</span>
        </div>
      }
    </Modal>
  );
});

export default ReceiveModal;
