import React, { FunctionComponent, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';

import './index.css';
import {
  SendContainer,
  SendTitle,
  SendBody,
  SendAmountContainer,
  CancelButton,
  AddressCaption,
} from './styles';
import { Icon } from 'snapkit';
import { Button, Caption, FlexCenter, H3, Modal, Popup } from '../../../kits';
import { ReactComponent as PaymentMethod } from './images/paymentMethod.svg';
import Divider from '../../../kits/Divider';
import Alert from '../../../kits/Alert';
import InfoIcon from '../../Icons/InfoIcon';
import { useAppStore } from '../../../mobx';

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const Initial: FunctionComponent<InitialProps> = observer(({ model, close }) => {
  const {
    settings: { dynamicAddress }
  } = useAppStore();
  const topUpModalRef = useRef<any>();
  
  return (
    <>
      <SendContainer>
        <Modal.Header
          left={<>
            <Icon.TopUp width='24' height='24' color='var(--sk-color-pri50)' />
            <H3 style={{ marginLeft: 10 }}>TOP UP</H3>
          </>}
          onClose={close}
        />

        {model.utxoLoading && <Modal.Loading />}

        <SendBody ref={topUpModalRef}>
          <SendTitle>
            Receive Address
            {dynamicAddress && <Popup
              trigger={
                <InfoIcon />
              }
              inverted
            >
              <Caption>
                The Bitcoins you bought will be sent to this address. To ensure maximum privacy, we generate a new Bitcoin address each time a deposit is received. You can disable this functionality and remain with a static address via wallet profile.
              </Caption>
            </Popup>}
          </SendTitle>
          <SendAmountContainer>
            <AddressCaption>{model.to}</AddressCaption>
          </SendAmountContainer>
          <Divider color='var(--sk-color-ntd10)'/>
          <SendTitle>Payment Method</SendTitle>
          <SendAmountContainer style={{ marginTop: 12 }}>
            <PaymentMethod />
          </SendAmountContainer>
        </SendBody>
      </SendContainer>

      <Modal.Footer style={{ flexDirection: 'column' }}>
        <Alert style={{ marginBottom: 16 }}>
          <Caption style={{ color: 'var(--sk-color-n60)'}}>
            After clicking <span style={{ color: 'var(--sk-color-n80)'}}>Continue</span>, you will be redirected to Mercuryo to complete your purchase securely.
          </Caption>
        </Alert>
        <FlexCenter style={{ width: '100%', gap: 24 }}>
          <CancelButton onClick={close}>
            Cancel
          </CancelButton>
          <Button
            onClick={() => {
              model.setStatus('pending')
            }}
            primary
            style={{ maxWidth: 176 }}
            disabled={!model.to}
          >
          Continue
          </Button>
        </FlexCenter>
      </Modal.Footer>
    </>
  );
});

export default Initial;
