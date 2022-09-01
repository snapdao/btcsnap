import React, { useState } from 'react';
import { Container, Modal } from 'semantic-ui-react';
import './index.css';
import ReceiveIcon from "../Icons/ReceiveIcon"
import { ReactComponent as Checked } from '../../assets/vector.svg'
import AddressBox from './AddressBox';
import CloseIcon from "../Icons/CloseIcon";

type ReceiveModalProps = {
  address: string;
  open: boolean;
  close: () => void;
};

const ReceiveModal = ({address, open, close}: ReceiveModalProps) => {
  const [addressCopied, setAddressCopy] = useState<boolean>(false);

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
      className={'modal-container'}
      open={open}
    >
      <Container className={'reveive-colored-container'}>
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
      </Container>
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
};

export default ReceiveModal;
