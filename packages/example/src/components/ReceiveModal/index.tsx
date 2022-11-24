import React, { useState } from 'react';
import {
  Container,
  Modal,
  Popup,
  TransitionablePortal,
} from 'semantic-ui-react';
import './index.css';
import ReceiveIcon from '../Icons/ReceiveIcon';
import LoadingIcon from '../Icons/Loading';
import AddressBox from './AddressBox';
import CloseIcon from '../Icons/CloseIcon';
import InfoIcon from '../Icons/InfoIcon';
import {
  ReceiveContainer,
  AddressPathContainer,
  LoadingContainer,
} from './styles';
import { observer } from 'mobx-react-lite';
import { useReceiveAddress } from '../../hook/useReceiveAddress';
import { useAppStore } from '../../mobx';
import { copyToClipboard } from '../../utils/clipboard';
import { Message, MessageType } from '../../kits/Message';

type ReceiveModalProps = {
  open: boolean;
  close: () => void;
};

const DYNAMIC_ADDRESS =
  'To ensure maximum privacy, we generate a new Bitcoin address each time a deposit is received. You can disable this functionality and remain with a static address via settings.';
const STATIC_ADDRESS =
  'You will use this fixed address for every receipt of Bitcoin. You can Enable Dynamic address functionality in settings to maximize your privacy.';

const ReceiveModal = observer(({ open, close }: ReceiveModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const {
    settings: { dynamicAddress },
  } = useAppStore();
  const { address, path, loading } = useReceiveAddress();
  const [addressCopied, setAddressCopy] = useState<boolean>(false);

  const copyAddress = async () => {
    if (address) {
      const copyStatus = await copyToClipboard({ text: address });
      if (copyStatus) {
        setAddressCopy(true);
        setTimeout(() => {
          setAddressCopy(false);
        }, 1500);
      }
    }
  };

  return (
    <TransitionablePortal
      open={isOpen}
      onClose={close}
      transition={{ animation: 'fade up', duration: '300' }}>
      <Modal
        style={{
          width: 440,
          height: 640,
          borderRadius: '20px',
          position: 'relative',
        }}
        open={true}>
        <ReceiveContainer>
          <div className={'modal-header'}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ReceiveIcon size={36} />
              <span style={{ marginLeft: 4, fontWeight: 600 }}>RECEIVE</span>
            </span>
            <CloseIcon onClick={() => setIsOpen(false)} />
          </div>

          {loading ? (
            <LoadingContainer>
              <LoadingIcon />
            </LoadingContainer>
          ) : (
            <>
              <AddressBox address={address} />
              <AddressPathContainer visible={!!address}>
                {dynamicAddress ? (
                  <>
                    <span>Address Path:</span>
                    <span>{path}</span>
                  </>
                ) : (
                  <span>Static Address</span>
                )}
                <Popup
                  position='top center'
                  content={dynamicAddress ? DYNAMIC_ADDRESS : STATIC_ADDRESS}
                  inverted
                  trigger={
                    <div>
                      <InfoIcon />
                    </div>
                  }
                />
              </AddressPathContainer>
            </>
          )}
        </ReceiveContainer>

        <Container
          className={address ? 'modal-content-container' : 'reveive-none'}>
          <button
            className={'receive-action-button action-button-primary'}
            onClick={copyAddress}>
            Copy Address
          </button>
        </Container>

        {addressCopied && (
          <Message type={MessageType.Succeed}>Copied to clipboard</Message>
        )}
      </Modal>
    </TransitionablePortal>
  );
});

export default ReceiveModal;
