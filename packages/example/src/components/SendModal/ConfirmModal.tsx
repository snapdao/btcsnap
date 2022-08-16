import SendViewModel from './model';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {Container, Divider, Loader, Modal} from 'semantic-ui-react';
import close from '../../assets/close.png';
import BTCValue from './BTCValue';

export type ConfirmModalProps = {
  model: SendViewModel;
};

const ConfirmModal: FunctionComponent<ConfirmModalProps> = observer(props => {
  const { model } = props;
  return (
    <Modal
      className={"modal-container"}
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
        <Container className={'modal-content-container colored-container'}>
          <div className={'modal-header'}>
            <span />
            <span className={'text-weight-bold'}>Confirm Transaction</span>
            <img
                style={{ cursor: 'pointer' }}
                src={close}
                width={12}
                alt={'close'}
                onClick={() => model.setConfirmOpen(false)}
            />
          </div>
          <div className={'modal-section vertical-center'}>
          <span className={'text-weight-bold text-secondary'}>
            You're Sending
          </span>
            <span style={{ marginTop: 8 }}>
            <BTCValue
                value={model.amountText}
                size={'large'}
                fontWeight={'normal'}
            />
          </span>
            <span
                className={'text-weight-bold text-secondary'}
                style={{ marginTop: 12 }}>
            To
          </span>
            <span style={{ marginTop: 12 }}>{model.to}</span>
          </div>
        </Container>
        <Container className={'modal-content-container'}>
          <div className={'modal-section'}>
            <div className={'flex row space-between'}>
              <span className={'text-secondary text-weight-bold'}>Amount</span>
              <BTCValue
                  value={model.amountText}
                  size={'normal'}
                  fontWeight={'normal'}
              />
            </div>
            <div className={'flex row space-between'} style={{ marginTop: 20 }}>
              <span className={'text-secondary text-weight-bold'}>Fee</span>
              <BTCValue
                  value={model.feeText}
                  size={'normal'}
                  fontWeight={'normal'}
              />
            </div>
            <Divider />
            <div className={'flex row space-between'}>
            <span className={'text-secondary text-weight-bold'}>
              Total Amount
            </span>
              <BTCValue
                  value={model.totalAmount}
                  size={'normal'}
                  fontWeight={'bold'}
              />
            </div>
          </div>
          <button
              style={{ marginTop: 72 }}
              className={
                'action-button action-button-primary action-button-size-full-width'
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
