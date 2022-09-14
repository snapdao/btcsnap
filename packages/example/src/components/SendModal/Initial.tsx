import React  from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Divider } from 'semantic-ui-react';
import SendViewModel from './model';

import './index.css';
import ConfirmModal from "./ConfirmModal";
import CloseIcon from "../Icons/CloseIcon";
import SendIcon from "../Icons/SendIcon";

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const Initial = observer(({ model, close }: InitialProps) => {
  return (
    <div>
      <Container className={'colored-container'}>
        <div className={'modal-header'}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SendIcon size={36} />
            <span style={{marginLeft: 4, fontWeight: 600 }}>SEND</span>
          </span>
          <CloseIcon onClick={close} />
        </div>
        <div className={'modal-body'}>
          <div className={'modal-section'}>
            <span className={'amount'}>
              Amount
            </span>
            <div className={'amount-input-box'}>
              <label style={{ fontSize: 16, color: '#F58300' }}>
                <input
                  autoFocus
                  className={'amount-input'}
                  size={model.amountLength}
                  value={model.amountText}
                  onChange={e => {
                    model.handleSendInput(e.target.value);
                  }}
                  placeholder="0"
                />
                {model.unit}
              </label>
            </div>
            {!model.amountValid && (
              <div className={'text-error'}>
                Insufficient Funds
              </div>
            )}
            <div className={'fee'}>
              <span className={'text-secondary text-weight-bold'}>Fee</span>
              <span className={'text-secondary'}>
                <span className={'fee-amount'}>{model.feeText}</span>
                <span style={{ marginLeft: '1ch' }}>{model.unit}</span>
              </span>
            </div>
          </div>
          <Divider />
          <div className={'modal-section available-btc'}>
            <span className={'text-secondary text-weight-bold'}>Available</span>
            <span className={'text-secondary'}>
              <span className={'available-amount'}>{model.availableBtc}</span>
              <span style={{ marginLeft: '1ch' }}>{model.unit}</span>
            </span>
          </div>
        </div>
      </Container>
      <Container className={'modal-bottom-container'}>
        <div className={'to-container'}>
          <span className={'text-secondary text-weight-bold'}>To</span>
          <input
            className={'to-input'}
            placeholder="Paste or input the destination address"
            value={model.to}
            onChange={e => {
              model.setTo(e.target.value);
            }}
          />
        </div>
        <Divider className={'bottom-divider'} />
        {!model.toValid && (
          <div className={'text-error'}>Enter a Valid Wallet Address</div>
        )}
        <div className={model.toValid ? 'send-actions-container' : 'actions-container-error'}>
          <button
            className={'send-action-button action-button-secondary'}
            onClick={close}>
            Cancel
          </button>
          <ConfirmModal model={model} />
        </div>
      </Container>
    </div>
  );
});

export default Initial;
