import { Button, Modal } from 'semantic-ui-react';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

import './index.css';
import send from '../../assets/send.png';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';
import {BitcoinNetwork, Utxo} from '../../interface';
import { SendInfo } from '../../lib';
import Initial from './Initial';
import Result from "./Result";

type ContainerProps = {
  utxos: Utxo[];
  feeRate: number;
  network: BitcoinNetwork;
  sendInfo?: SendInfo;
};

const SendContainer: FunctionComponent<ContainerProps> = props => {
  const model = useMemo(() => {
    return new SendViewModel(
      props.utxos,
      props.feeRate,
      props.network,
      props.sendInfo,
    );
  }, []);
  useEffect(() => {
    model.setUtxos(props.utxos);
    model.setFeeRate(props.feeRate);
    if (props.sendInfo) {
      model.setSendInfo(props.sendInfo);
    }
  }, [props.utxos, props.feeRate, props.sendInfo]);
  return <SendModal model={model} />;
};

const SendModal = observer((props: { model: SendViewModel }) => {
  const { model } = props;
  return (
    <Modal
      className={"modal-container"}
      onOpen={() => model.setSendOpen(true)}
      onClose={() => model.setSendOpen(false)}
      open={model.sendOpen}
      trigger={
        <Button basic className={'modal-trigger'}>
          <img src={send} alt={'send transaction'} />
        </Button>
      }>
      {model.status === 'initial' && <Initial model={model} />}
      {model.status !== 'initial' && <Result model={model}  />}
    </Modal>
  );
});

export default SendContainer;
