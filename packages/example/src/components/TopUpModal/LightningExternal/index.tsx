import React, { useState } from 'react';
import LoadingIcon from '../../Icons/Loading';
import AddressBox from './AddressBox';
import {
  ReceiveContainer,
  AddressPathContainer,
  LoadingContainer,
} from './styles';
import { observer } from 'mobx-react-lite';
import { useTopUpAddress } from '../../../hook/useTopUpAddress';
import { copyToClipboard } from '../../../utils/clipboard';
import { Message, MessageType } from '../../../kits/Message';
import { Body, Button, H3, Modal } from '../../../kits';
import { Icon } from 'snapkit';

type TopUpWithExternalWalletModalProps = {
  close: () => void;
};

const LoadingBox = <LoadingContainer>
  <LoadingIcon />
</LoadingContainer>;

const TopUpWithExternalWalletModal = observer(({  close }: TopUpWithExternalWalletModalProps) => {
  const { address, loading, errorMessage } = useTopUpAddress();
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
      open
      style={{
        width: 440,
        height: 640, 
      }}
      close={close}>
      <ReceiveContainer>
        <Modal.Header
          left={
            <>
              <Icon.TopUp width='26px' height='26px' color='var(--sk-color-pri50)' />
              <H3 style={{ marginLeft: 12 }}>TOP UP</H3>
            </>
          }
          style={{ padding: '20px 26px 0' }}
          onClose={() => close()}
        />
        {loading
          ? LoadingBox
          : <>
            <AddressBox address={address} />
            <AddressPathContainer>
              <Body>Use the QR code or address above to refill your wallet</Body>
            </AddressPathContainer>
          </>}
          
        
      </ReceiveContainer>

      {!loading && <Modal.Footer>
        <Button primary onClick={copyAddress}>
          Copy Address
        </Button>
      </Modal.Footer>}

      {addressCopied && (
        <Message type={MessageType.Succeed}>Copied to clipboard</Message>
      )}
      {errorMessage && (
        <Message type={MessageType.Error}>{errorMessage}</Message>
      )}
    </Modal>
  );
});

export default TopUpWithExternalWalletModal;
