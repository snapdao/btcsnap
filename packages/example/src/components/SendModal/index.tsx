import {Button, Container, Divider, Modal} from 'semantic-ui-react';
import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';

import './index.css';
import send from '../../assets/send.png';
import close from '../../assets/close.png';
import {observer} from 'mobx-react-lite';
import SendViewModel from './model';
import {Utxo} from '../../interface';
import {Network} from "bitcoin-address-validation";

type ContainerProps = {
  utxos: Utxo[];
  feeRate: number;
};

const SendContainer: FunctionComponent<ContainerProps> = props => {
  const model = useMemo(() => {
    return new SendViewModel(props.utxos, props.feeRate, Network.mainnet);
  }, []);
  useEffect(() => {
    model.setUtxos(props.utxos);
    model.setFeeRate(props.feeRate);
  }, [props.utxos, props.feeRate]);
  return <SendModal model={model} />;
};

const SendModal = observer((props: { model: SendViewModel }) => {
  const { model } = props;
  const [open, setOpen] = useState(false);
  return (
    <Modal
      style={{ width: 440 }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      trigger={
        <Button basic className={'modal-trigger'}>
          <img src={send} alt={'send transaction'} />
        </Button>
      }>
      <Container className={'modal-content-container colored-container'}>
        <div className={'modal-header'}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <img src={send} width={24} alt={'send transaction'} />
            <span>SEND</span>
          </span>
          <img
            style={{ cursor: 'pointer' }}
            src={close}
            width={12}
            alt={'close'}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={'modal-section'}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#9095A3' }}>
            Amount
          </span>
          <div className={'amount-input-box'}>
            <label style={{ fontSize: 16, color: '#F58300' }}>
              <input
                className={'amount-input'}
                size={model.amountLength}
                value={model.amountText}
                onChange={e => {
                  model.handleSendInput(e.target.value);
                }}
                placeholder="0"
              />
              BTC
            </label>
          </div>
          {!model.amountValid && <div className={"text-error"} style={{marginTop: 8}}>Insufficient Funds</div>}
          <div className={'fee'}>
            <span className={'text-secondary text-bold'}>Fee</span>
            <span className={'text-secondary'}>
              <span>{model.feeText}</span>
              <span style={{ marginLeft: '1ch' }}>BTC</span>
            </span>
          </div>
        </div>
        <Divider />
        <div className={'modal-section available-btc'}>
          <span className={'text-secondary text-bold'}>Available</span>
          <span className={'text-secondary'}>
            <span>{model.availableBtc}</span>
            <span style={{ marginLeft: '1ch' }}>BTC</span>
          </span>
        </div>
      </Container>
      <Container className={'modal-content-container'}>
        <div className={'to-container'}>
          <span className={'text-secondary text-bold'}>To</span>
          <input
            className={'to-input'}
            placeholder="Paste or scan the destination address"
            value={model.to}
            onChange={(e) => {
              model.setTo(e.target.value);
            }}
          />
        </div>
        <Divider />
        {!model.toValid && <div className={"text-error"}>Enter a Valid Wallet Address</div>}
        <div className={'actions-container'}>
          <button className={'action-button action-button-secondary'} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className={`action-button ${
              model.valid ? 'action-button-primary' : 'action-button-disable'
            }`}>
            Send
          </button>
        </div>
      </Container>
    </Modal>
  );
});

export default SendContainer;
