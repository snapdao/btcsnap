import React, { useState } from 'react';
import { Container, Modal } from 'semantic-ui-react';
import './index.css';
import '../Account/Account.css';
import receive from '../../assets/receive.svg'
import vector from '../../assets/vector.svg'
import closeIcon from '../../assets/close.svg';
import AddressBox from './AddressBox';

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
      <div className='colored-container'>
        <Container className={'modal-content-container'}>
          <div className={'modal-header'}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <img src={receive} width={24} alt={'receive transaction'} />
              <span style={{marginLeft: 4}}>RECEIVE</span>
            </span>
            <div className={'modal-close-icon'}>
              <img
                style={{ cursor: 'pointer' }}
                src={closeIcon}
                width={12}
                alt={'close'}
                onClick={close}
              />
            </div>
          </div>
          <div className={'addressBox-container'}>
            <AddressBox address={address} />
          </div>
        </Container>
        <Container className={'modal-content-container'}>
          <div className={'actions-container'}>
            <button
              className={'action-button action-button-primary'}
              onClick={copyAddress}>
              Copy Address
            </button>
          </div>
        </Container>

        {addressCopied &&
          <div className={'addressCopied-message'}>
            <img className={'addressCopied-message-icon'} src={vector} alt="vector" />
            <span className={'addressCopied-message-span'}>Copied to clipboard</span>
          </div>
        }
      </div>
    </Modal>
  );
};

export default ReceiveModal;
