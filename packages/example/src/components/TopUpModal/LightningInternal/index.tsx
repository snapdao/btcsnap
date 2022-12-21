import React, { useEffect, useMemo } from 'react';
import './index.css';
import { observer } from 'mobx-react-lite';
import TopUpViewModel from './model';
import { BitcoinNetwork, BitcoinScriptType, BitcoinUnit } from '../../../interface';
import Initial from './Initial';
import Result from './Result';
import { useSendInfo } from './useSendInfo';
import { Message, MessageType, Modal } from '../../../kits';
import { useTopUpAddress } from '../../../hook/useTopUpAddress';

type ContainerProps = {
  currencyRate: number;
  network: BitcoinNetwork;
  scriptType: BitcoinScriptType;
  close: () => void;
  unit: BitcoinUnit;
};

const TopUpWithWalletModal = ({ network, scriptType, close, unit, currencyRate }: ContainerProps) => {
  const { address, loading, errorMessage } = useTopUpAddress();
  const { feeRate, utxos, sendInfo, utxoLoading } = useSendInfo();

  const model = useMemo(() => {
    return new TopUpViewModel(
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
    !loading && model.setTo(address);
    model.setUtxos(utxos);
    model.setFeeRate(feeRate);
    if (sendInfo) {
      model.setSendInfo(sendInfo);
    }
    model.setNetwork(network);
    model.setUtxoLoading(utxoLoading);
  }, [utxos, feeRate, sendInfo, network, address, loading, utxoLoading]);

  return <TopUpModal model={model} errorMessage={errorMessage} close={close} />;
};

const TopUpModal = observer((props: { model: TopUpViewModel, errorMessage?: string, close: () => void }) => {
  const { model, close, errorMessage } = props;
  return (
    <Modal
      style={{ width: 440, minHeight: 640, borderRadius: 20, position: 'relative' }}
      onOpen={() => {
        model.resetState();
      }}
      open
    >
      {model.status === 'initial' && <Initial model={model} close={close} />}
      {model.status !== 'initial' && <Result model={model} close={close} />}
      {errorMessage && <Message type={MessageType.Error}>{errorMessage}</Message>}
    </Modal>
  );
});

export default TopUpWithWalletModal;
