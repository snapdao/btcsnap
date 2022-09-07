import { Modal } from 'semantic-ui-react';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';
import { BitcoinNetwork, Utxo } from '../../interface';
import { SendInfo } from '../../lib';
import Initial from './Initial';
import Result from './Result';
import { useFeeRate } from '../../hook/useBitcoinTx';
import SendIcon from "../Icons/SendIcon";
import { ActionButton } from "./styles";

type ContainerProps = {
  utxos: Utxo[];
  network: BitcoinNetwork;
  sendInfo?: SendInfo;
};

const SendContainer: FunctionComponent<ContainerProps> = props => {
  const { feeRate } = useFeeRate(props.network);

  const model = useMemo(() => {
    return new SendViewModel(
      props.utxos,
      feeRate,
      props.network,
      props.sendInfo,
    );
  }, []);
  useEffect(() => {
    model.setUtxos(props.utxos);
    model.setFeeRate(feeRate);
    if (props.sendInfo) {
      model.setSendInfo(props.sendInfo);
    }
    model.setNetwork(props.network)
  }, [props.utxos, feeRate, props.sendInfo, props.network]);
  return <SendModal model={model} />;
};

const SendModal = observer((props: { model: SendViewModel }) => {
  const { model } = props;
  return (
    <Modal
      className={'modal-container'}
      onOpen={() => {
        model.resetState();
        model.setSendOpen(true)
      }}
      open={model.sendOpen}
      trigger={
        <ActionButton>
          <SendIcon size={48} />
        </ActionButton>
      }>
      {model.status === 'initial' && <Initial model={model} />}
      {model.status !== 'initial' && <Result model={model} />}
    </Modal>
  );
});

export default SendContainer;
