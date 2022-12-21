import React, { useState } from 'react';
import { Popup } from 'semantic-ui-react';
import './index.css';
import ReceiveIcon from '../Icons/ReceiveIcon';
import LoadingIcon from '../Icons/Loading';
import AddressBox from './AddressBox';
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
import { Message, MessageType, H3, Modal } from '../../kits';

type ReceiveModalProps = {
  open: boolean;
  close: () => void;
};

const DYNAMIC_ADDRESS =
  'To ensure maximum privacy, we generate a new Bitcoin address each time a deposit is received. You can disable this functionality and remain with a static address via wallet profile.';
const STATIC_ADDRESS =
  'You will use this fixed address for every receipt of Bitcoin. You can Enable Dynamic address functionality in wallet profile to maximize your privacy.';

const ReceiveModal = observer(({ open, close }: ReceiveModalProps) => {
  const {
    settings: { dynamicAddress },
  } = useAppStore();
  const { address, path, loading } = useReceiveAddress();
  const [addressCopied, setAddressCopy] = useState<boolean>(false);

  const copyAddress = async () => {
    if (address) {
      const copyStatus = await copyToClipboard(address);
      if (copyStatus) {
        setAddressCopy(true);
        setTimeout(() => {
          setAddressCopy(false);
        }, 1500);
      }
    }
  };

  return (
    <Modal
      open={open}
      style={{
        width: 440,
        height: 640,
        borderRadius: '20px',
        position: 'relative',
      }}>
      <ReceiveContainer>
        <Modal.Header
          left={(
            <>
              <ReceiveIcon size={36} />
              <H3 style={{ marginLeft: 4 }}>RECEIVE</H3>
            </>
          )}
          onClose={() => close()}
        />

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

      
      <Modal.Footer>
        <button
          className={'receive-action-button action-button-primary'}
          onClick={copyAddress}>
            Copy Address
        </button>
      </Modal.Footer>

      {addressCopied && (
        <Message type={MessageType.Succeed}>Copied to clipboard</Message>
      )}
    </Modal>
  );
});

export default ReceiveModal;
