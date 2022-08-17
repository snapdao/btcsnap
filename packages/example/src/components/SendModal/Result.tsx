import React, { FunctionComponent, useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import SendViewModel from './model';
import { observer } from 'mobx-react-lite';
import BTCValue from './BTCValue';

import './index.css';
import send_success from '../../assets/send_success.svg';
import send_failed from '../../assets/send_failed.svg';
import arrow_right from '../../assets/arrow_right.svg';
import close from '../../assets/close.svg';
import { useKeystoneStore } from "../../mobx";
import { storeTransaction } from "../../lib/txStorage";

export type SuccessProps = {
  model: SendViewModel;
};

const Result: FunctionComponent<SuccessProps> = observer(({ model }) => {
  const { global: {bip44Xpub, network}, addTransaction } = useKeystoneStore();

  useEffect(() => {
    if(model.status === 'success' && !!model.sentTx){
      addTransaction(model.sentTx)
      storeTransaction(bip44Xpub, network, model.sentTx);
    }
  }, [])

  return (
    <div>
      <Container className={'modal-content-container colored-container'}>
        <div className={'modal-header'}>
          <span />
          <span />
          <img
            style={{ cursor: 'pointer' }}
            src={close}
            width={12}
            alt={'close'}
            onClick={() => model.setSendOpen(false)}
          />
        </div>
        <div className={'modal-section vertical-center'}>
          {model.status === 'success' && (
            <>
              <img src={send_success} alt={'send success'} />
              <span
                className={'text-weight-bold'}
                style={{ marginTop: 16, marginBottom: 24 }}>
                Sent to the Network
              </span>
            </>
          )}
          {model.status === 'failed' && (
            <>
              <img src={send_failed} alt={'send failed'} />
              <span
                className={'text-weight-bold text-error'}
                style={{ marginTop: 16, marginBottom: 24 }}>
                Transaction Failed
              </span>
            </>
          )}
          <BTCValue
            value={model.amountText}
            size={'large'}
            fontWeight={'normal'}
          />
          <div
            style={{ marginTop: 24, width: '100%' }}
            className={'horizontal-center space-around'}>
            <span className={'account-tag'}>Your Account</span>
            <img src={arrow_right} alt={'to'} />
            <span className={'account-tag'}>{model.formattedTo}</span>
          </div>
        </div>
      </Container>
      <Container className={'modal-content-container'}>
        <div className={'modal-section vertical-center'}>
          {model.status === 'success' && (
            <>
              <div
                className={
                  'text-secondary text-align-center text-size-normal text-line-height-normal'
                }>
                The network may still need up to 60 mins to complete the
                transaction
              </div>
              <div
                className={'vertical-center'}
                style={{ marginTop: 54, width: '100%' }}>
                <button
                  onClick={() => model.setSendOpen(false)}
                  className={
                    'action-button action-button-primary action-button-size-full-width'
                  }>
                  OK
                </button>
                <a
                  href={model.transactionLink}
                  target={'_blank'}
                  className={
                    'action-button action-button-size-full-width text-weight-bold all-center'
                  }
                  style={{ color: '#FF6C0A', marginTop: 20 }}>
                  View on Explorer
                </a>
              </div>
            </>
          )}
          {model.status === 'failed' && (
            <>
              <div
                className={
                  'text-secondary text-align-center text-size-normal text-line-height-normal'
                }>
                <p>Reason of the failed transaction.</p>
                <p>{model.errorMessage}</p>
              </div>
              <div
                className={'vertical-center'}
                style={{ marginTop: 54, width: '100%' }}>
                <button
                  onClick={() => model.setSendOpen(false)}
                  className={
                    'action-button action-button-primary action-button-size-full-width'
                  }>
                  OK
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
});

export default Result;
