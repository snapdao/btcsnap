import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SendViewModel from './model';
import { observer } from 'mobx-react-lite';
import BTCValue from './BTCValue';
import './index.css';
import { ReactComponent as SendSuccess } from '../../assets/send_success.svg';
import { ReactComponent as SendFailed } from '../../assets/send_failed.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg';
import CloseIcon from '../Icons/CloseIcon';
import {
  Button,
  FailedContainer,
  FailedText
} from './styles';
import { useAppStore } from '../../mobx';
import { AppStatus } from '../../mobx/runtime';

export type SuccessProps = {
  model: SendViewModel;
  close: () => void;
};

const Result = observer(({ model, close }: SuccessProps) => {
  const { runtime: { setStatus } } = useAppStore();

  useEffect(() => {
    if(model.status === 'success'){
      setStatus(AppStatus.RefreshApp);
    }
  }, []);

  return (
    <div>
      <Container className={'colored-container'}>
        <div className={'modal-header'}>
          <span />
          <span />
          <CloseIcon onClick={close} />
        </div>
        <div className={'vertical-center result-content-container'}>
          {model.status === 'success' && (
            <>
              <SendSuccess />
              <span
                className={'text-weight-bold'}
                style={{ padding: '16px 0 24px', lineHeight: '30px', fontSize: '20px' }}>
                Sent to the Network
              </span>
            </>
          )}
          {model.status === 'failed' && (
            <>
              <SendFailed />
              <span
                className={'text-weight-bold text-error'}
                style={{ padding: '16px 0 24px', lineHeight: '30px', fontSize: '20px' }}>
                Transaction Failed
              </span>
            </>
          )}
          <div className={'confirm-btc-box'}>
            <BTCValue
              value={model.amountText}
              size={'large'}
              fontWeight={'normal'}
              unit={model.mainUnit}
            />
          </div>
          <div
            style={{ marginTop: 24, width: '100%' }}
            className={'horizontal-center space-around'}>
            <span className={'account-tag'}>Your Account</span>
            <ArrowRight />
            <span className={'account-tag'}>{model.formattedTo}</span>
          </div>
        </div>
      </Container>

      {model.status === 'success' && (
        <div className={'result-failed-section'}>
          <div
            className={
              'text-secondary text-align-center text-size-normal text-line-height-normal'
            }
          >
            <p className={'result-sucess-p'}>The network may still need up to 60 mins to completely process the transaction</p>
          </div>
          <div
            className={'vertical-center'}
            style={{ marginTop: 54, width: '100%' }}>
            <button
              onClick={close}
              className={
                'action-button action-button-primary action-button-size-full-width ok-action-button'
              }>
              OK
            </button>
            <a
              href={model.transactionLink}
              target={'_blank'}
              className={'explorer-link text-weight-bold all-center'}
              style={{ color: '#FF6C0A', marginTop: 20, lineHeight: '20px' }} rel='noreferrer'>
              View on Explorer
            </a>
          </div>
        </div>
      )}

      {model.status === 'failed' && (
        <FailedContainer>
          <FailedText>{model.errorMessage.message}<span> [{model.errorMessage.code}] </span>.</FailedText>
          <Button onClick={close}>OK</Button>
        </FailedContainer>
      )}
    </div>
  );
});

export default Result;
