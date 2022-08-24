import SendViewModel from './model';
import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import {Container, Divider, Loader, Modal} from 'semantic-ui-react';
import BTCValue from './BTCValue';
import CloseIcon from "../Icons/CloseIcon";

export type ConfirmModalProps = {
  model: SendViewModel;
};

const ConfirmModal: FunctionComponent<ConfirmModalProps> = observer(props => {
  const { model } = props;
  return (
    <Modal
      className={"modal-container"}
      style={{ marginTop: 32 }}
      onOpen={() => model.setConfirmOpen(true)}
      onClose={() => model.setConfirmOpen(false)}
      open={model.confirmOpen}
      openOnTriggerClick={model.valid}
      trigger={
        <button
          className={`action-button ${
            model.valid ? 'action-button-primary' : 'action-button-disable'
          }`}>
          Send
        </button>
      }>
      {model.isSending ? <>
        <Loader />
      </>: <>
        <Container className={'colored-container'}>
          <div className={'modal-header'}>
            <span />
            <span className={'text-weight-bold'}>Confirm Transaction</span>
            <CloseIcon onClick={() => model.setConfirmOpen(false)} />
          </div>
          <div className={'modal-confirm-box vertical-center'}>
            <span className={'text-weight-bold text-secondary confirm-top-span'}>
              You're Sending
            </span>
            <div className={'confirm-btc-box'}>
              <BTCValue
                value={model.amountText}
                size={'large'}
                fontWeight={'normal'}
                unit={model.unit}
              />
            </div>
            <span className={'text-weight-bold text-secondary confirm-middle-span'}>
              To
            </span>
            <span style={{ fontWeight: 600 }}>{model.to}</span>
          </div>
        </Container>
        <Container className={'modal-confirm-section'}>
          <div className={'modal-section'}>
            <div className={'flex row space-between'}>
              <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Amount</span>
              <BTCValue
                value={model.amountText}
                size={'normal'}
                fontWeight={'normal'}
                unit={model.unit}
              />
            </div>
            <div className={'flex row space-between'}>
              <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Fee</span>
              <BTCValue
                value={model.feeText}
                size={'normal'}
                fontWeight={'normal'}
                unit={model.unit}
              />
            </div>
            <Divider className={'bottom-divider'} />
            <div className={'flex row space-between confirm-amount-section'}>
              <span className={'text-secondary text-weight-bold'}>
                Total Amount
              </span>
              <BTCValue
                value={model.totalAmount}
                size={'normal'}
                fontWeight={'bold'}
                unit={model.unit}
              />
            </div>
          </div>
          <button
            style={{ marginTop: 72 }}
            className={
              'action-button action-button-primary action-button-size-full-width confirm-action-button'
            }
            onClick={model.send}>
            Confirm
          </button>
        </Container>
      </>}

    </Modal>
  );
});

export default ConfirmModal;
