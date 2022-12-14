import { useEffect } from 'react';
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

export type SuccessProps = {
  model: SendViewModel;
  close: () => void;
};

const Result = observer(({ model, close }: SuccessProps) => {
  const { runtime: { setStatus } } = useAppStore();

  const pendingText = model.status === 'timeout' ? 
    'Get payment status failed'
    : model.isRefresh
      ? 'Getting Payment Status...'
      : 'Please finish your payment in the new tab';

  useEffect(() => {
    if(model.status === 'success'){
      setStatus(AppStatus.RefreshApp);
    }
  }, [model.status]);

  return (
    <div>
      <Modal.Header
        left={
          ![ 'success', 'failed' ].includes(model.status)
            ? <>
              <Icon.TopUp width='24' height='24' color='var(--sk-color-pri50)' />
              <H3 style={{ marginLeft: 10 }}>TOP UP</H3>
            </>
            : null}
        onClose={close}
      />
      <Modal.Background>
        {[ 'pending', 'timeout' ].includes(model.status) && (
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
        { [ 'success', 'failed' ].includes(model.status) && 
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
            <p className={'result-sucess-p'}>The network may need up to 60 mins to completely process the transaction.</p>
          </div>
        </ResultSuccessSection>
      )}

      {model.status === 'failed' && (
        <FailedContainer>
          <FailedText>{model.errorMessage.message}<span> [{model.errorMessage.code}] </span>.</FailedText>
        </FailedContainer>
      )}

      {model.status === 'timeout' && (
        <FailedContainer>
          <FailedText>支付成功后可能仍需要一点时间才能获取到充值结果，如果你已完成付款，请检查你注册 Mercuryo 使用的邮箱是否收到付款证明</FailedText>
        </FailedContainer>
      )}

      <Modal.Footer style={{ flexDirection: 'column', gap: '24px 0' }}>
        {
          model.status === 'pending' ?
            <>
              <Button onClick={close}>Close</Button>
              <Button.Text loading={model.isRefresh} onClick={model.refreshStatus}>I‘ve Finished the Payment</Button.Text>
            </>
            : <Button primary onClick={close}>OK</Button>
        }
      </Modal.Footer>
    </div>
  );
});

export default Result;
