import { Modal } from 'semantic-ui-react';
import React, { useEffect, useMemo } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';
import { BitcoinNetwork, BitcoinScriptType } from '../../interface';
import Initial from './Initial';
import Result from './Result';
import { useSendInfo } from "./useSendInfo";

type ContainerProps = {
  network: BitcoinNetwork;
  scriptType: BitcoinScriptType;
  close: () => void;
};

const SendContainer = ({network, scriptType, close}: ContainerProps) => {
  const {feeRate, utxos, sendInfo} = useSendInfo()

  const model = useMemo(() => {
    return new SendViewModel(
      utxos,
      feeRate,
      network,
      scriptType,
      sendInfo,
    );
  }, []);

  useEffect(() => {
    model.setUtxos(utxos);
    model.setFeeRate(feeRate);
    if (sendInfo) {
      model.setSendInfo(sendInfo);
    }
    model.setNetwork(network)
  }, [utxos, feeRate, sendInfo, network]);

  return <SendModal model={model} close={close} />;
};

const SendModal = observer((props: { model: SendViewModel, close: () => void }) => {
  const { model, close } = props;
  return (
    <Modal
      className={'modal-container'}
      onOpen={() => {
        model.resetState();
      }}
      open={true}
    >
      {model.status === 'initial' && <Initial model={model} close={close} />}
      {model.status !== 'initial' && <Result model={model} close={close} />}
    </Modal>
  );
});

export default SendContainer;
