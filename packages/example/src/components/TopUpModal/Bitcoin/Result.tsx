import { useEffect, useState } from 'react';
import SendViewModel from './model';
import { observer } from 'mobx-react-lite';
import './index.css';
import { ReactComponent as SendSuccess } from '../../../assets/send_success.svg';
import { ReactComponent as SendFailed } from '../../../assets/send_failed.svg';
import { ReactComponent as ArrowRight } from '../../../assets/arrow_right.svg';
import {
  FailedContainer,
  FailedText,
  PendingContainer,
  PendingIconContainer,
  ResultSuccessSection,
  ResultContainer
} from './styles';
import { useAppStore } from '../../../mobx';
import { AppStatus } from '../../../mobx/runtime';
import { Body, Button, H3, Modal } from '../../../kits';
import { Icon } from 'snapkit';
import MercuryoIcon from '../../Icons/MercuryoIcon';
import InsideLoadingIcon from '../../Icons/InsideLoading';
import { BitcoinUnit } from '../../../interface';
import BTCValue from './BTCValue';
import { trackTopUp } from '../../../tracking';

export type SuccessProps = {
  model: SendViewModel;
  close: () => void;
};

const INTERVAL_TIME = 5000;

const Result = observer(({ model, close }: SuccessProps) => {
  const { runtime: { setStatus } } = useAppStore();

  const pendingText = model.status === 'timeout' ? 
    'Get payment status failed'
    : model.isRefresh
      ? 'Getting Payment Status...'
      : 'Please finish your payment in the new tab';

  const [intervalTimer, setIntervalTimer] = useState<number | null>(null);
  const [timeoutTimer, setTimeoutTimer] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      clearInterval(interval);
      model.setStatus('timeout');
    }, 2 * 60 * 1000);
    setTimeoutTimer(timer as unknown as number);

    const interval = setInterval(() => {
      model.refreshStatus();
    }, INTERVAL_TIME);
    setIntervalTimer(interval as unknown as number);

    return () => {
      clearTimeout(timeoutTimer as unknown as number);
      clearInterval(intervalTimer as unknown as number);
    };
  }, []);

  useEffect(() => {
    if (['timeout', 'failed', 'success'].includes(model.status)) {
      clearTimeout(timeoutTimer as unknown as number);
      clearInterval(intervalTimer as unknown as number);
    }
    if(model.status === 'success'){
      setStatus(AppStatus.RefreshApp);
    }
  }, [model.status, timeoutTimer, intervalTimer]);

  function manualRefreshStatus() {
    model.setManualRefreshed();
    if (model.isRefresh) return;
    const isTimeout = model.status === 'timeout';
    if (isTimeout) {
      model.setStatus('pending');
    }
    model.setIsRefresh(true);
    model.refreshStatus();
    setTimeout(() => {
      model.setIsRefresh(false);
      if (['success', 'failed'].includes(model.status)) return;
      if (isTimeout) {
        model.setStatus('timeout');
      }
    }, 5000);
  }

  function onClose() {
    trackTopUp({
      type: 'bitcoin',
      step: 'close',
    });
    close();
  }

  return (
    <div>
      <Modal.Header
        left={
          !['success', 'failed'].includes(model.status)
            ? <>
              <Icon.TopUp width='24' height='24' color='var(--sk-color-pri50)' />
              <H3 style={{ marginLeft: 10 }}>TOP UP</H3>
            </>
            : null}
        onClose={onClose}
      />
      <Modal.Background>
        {['pending', 'timeout'].includes(model.status) && (
          <PendingContainer>
            <PendingIconContainer>
              <InsideLoadingIcon spin={model.status !== 'timeout'} width={96} height={96} />
              <MercuryoIcon />
            </PendingIconContainer>
            <Body className={model.status === 'timeout' ? 'text-error' : ''} style={{ marginTop: 24 }}>
              {pendingText}
            </Body>
          </PendingContainer>
        )}
        { ['success', 'failed'].includes(model.status) && 
          <ResultContainer>
            {{
              success: <SendSuccess />,
              failed: <SendFailed />
            }[model.status as 'success' | 'failed']}
            <span
              className={`text-weight-bold ${model.status !== 'success' ? 'text-error' : ''}`}
              style={{ padding: '16px 0 24px', lineHeight: '30px', fontSize: '20px' }}>
               Top Up {model.status === 'success' ? 'Success' : 'Failed'}
            </span>
            <div className={'confirm-btc-box'}>
              <BTCValue
                value={model.amountText}
                size={'large'}
                fontWeight={'normal'}
                unit={BitcoinUnit.BTC}
              />
            </div>
            <div
              style={{ marginTop: 24, width: '100%', padding: '0 62px' }}
              className={'horizontal-center space-around'}>
              <span className={'account-tag'}>Mercuryo</span>
              <ArrowRight />
              <span className={'account-tag'}>{model.formattedTo}</span>
            </div>
          </ResultContainer>
        }
      </Modal.Background>

      {model.status === 'success' && (
        <ResultSuccessSection>
          <div
            className={
              'text-secondary text-align-center text-size-normal text-line-height-normal'
            }
          >
            <p className={'result-sucess-p'}>Payment successful. The network may need up to 2−4 hours to completely process the transaction. In rare cases, it may take up to 48 hours due to some delays.</p>
          </div>
        </ResultSuccessSection>
      )}

      {model.status === 'failed' && (
        <FailedContainer>
          <FailedText>{model.errorMessage}.</FailedText>
        </FailedContainer>
      )}

      {(model.status === 'timeout' || model.showDelayHint) && (
        <FailedContainer>
          <FailedText>It might take a few minutes to receive the payment result, please refer to the notification email or check changes on your balance for the final result if you have completed the process in Mercuryo.</FailedText>
        </FailedContainer>
      )}

      <Modal.Footer style={{ flexDirection: 'column', gap: '24px 0' }}>
        {
          ['pending', 'timeout'].includes(model.status) ?
            <>
              <Button onClick={onClose}>Close</Button>
              <Button.Text loading={model.isRefresh} onClick={manualRefreshStatus}>I‘ve Finished the Payment</Button.Text>
            </>
            : <Button primary onClick={close}>OK</Button>
        }
      </Modal.Footer>
    </div>
  );
});

export default Result;
