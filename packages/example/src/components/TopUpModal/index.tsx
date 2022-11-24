import { Modal, TransitionablePortal } from 'semantic-ui-react';
import React, { useEffect, useMemo } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';
import { BitcoinNetwork, BitcoinScriptType, BitcoinUnit } from '../../interface';
import Initial from './Initial';
import Result from './Result';
import { useSendInfo } from './useSendInfo';

type ContainerProps = {
  currencyRate: number;
  network: BitcoinNetwork;
  scriptType: BitcoinScriptType;
  close: () => void;
  unit: BitcoinUnit;
};

const TopUpContainer = ({network, scriptType, close, unit, currencyRate}: ContainerProps) => {
  const {feeRate, utxos, sendInfo} = useSendInfo();

  const model = useMemo(() => {
    return new SendViewModel(
      utxos,
      feeRate,
      currencyRate,
      network,
      unit,
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
    model.setNetwork(network);
  }, [utxos, feeRate, sendInfo, network]);

  return <SendModal model={model} close={close} />;
};

const SendModal = observer((props: { model: SendViewModel, close: () => void }) => {
  const { model, close } = props;
  return (
    <TransitionablePortal
      open={true}
      transition={{ animation: 'fade up', duration: '300' }}
      closeOnDocumentClick={false}
    >
      <Modal
        style={{width: 440, minHeight: 640, borderRadius: 20, position: 'relative'}}
        onOpen={() => {
          model.resetState();
        }}
        open={true}
      >
        {model.status === 'initial' && <Initial model={model} close={close} />}
        {model.status !== 'initial' && <Result model={model} close={close} />}
      </Modal>
    </TransitionablePortal>
  );
});

export default TopUpContainer;
