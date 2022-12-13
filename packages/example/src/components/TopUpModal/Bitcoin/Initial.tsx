import React, { ChangeEvent, FunctionComponent, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';

import './index.css';
import ConfirmModal from './ConfirmModal';
import TransactionFee from './TransactionFee';
import SwitchIcon from '../../Icons/SwitchIcon';
import ArrowDown from '../../Icons/ArrowDown';

import {
  SendContainer,
  SendTitle,
  SendBody,
  SendAmountContainer,
  SendAmountInput,
  SendAmountMax,
  SendTextError,
  SendAmountItem,
  SendAmountTransition,
  SendAmountFee,
  SendAvailableContainer,
  SendButtonContainer,
  CancelButton,
  SendAvailableBox,
  BalanceBox,
  BalanceUnit,
  AddressCaption,
} from './styles';
import { Icon } from 'snapkit';
import { Body, Caption, H3, H4, Input, Modal } from '../../../kits';
import BitcoinIcon2 from '../../Icons/BitcoinIcon2';
import { BalanceContainer } from './styles';
import { useAppStore } from '../../../mobx';
import { useBalance } from '../../../hook/useBalance';
import { BitcoinUnit, WalletType } from '../../../interface';
import { satoshiToBTC } from '../../../lib/helper';
import { bitcoinUnitMap } from '../../../lib/unit';
import Divider from '../../../kits/Divider';

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const numberReg = /^\d*(?:\.\d*)?$/;

const Initial: FunctionComponent<InitialProps> = observer(({ model, close }) => {
  const { currentUnit } = useAppStore();
  const { balance } = useBalance({ type: WalletType.BitcoinWallet});
  const [transactionFee, setTransactionFee] = useState<boolean>(false);
  const topUpModalRef = useRef<any>();

  const openTransactionFee = () => {
    setTransactionFee(true);
  };

  const closeTransactionFee = () => {
    setTransactionFee(false);
  };
  
  const balanceText = currentUnit === BitcoinUnit.BTC ? satoshiToBTC(balance) : balance;
  const showFee = useMemo(() => {
    return model.amountText !== '' && model.amountValid.valid;
  }, [model.amountText, model.amountValid]);

  return (
    <>
      <SendContainer>
        <Modal.Header
          left={<>
            <Icon.TopUp width='24' height='24' color='var(--sk-color-pri50)' />
            <H3 style={{ marginLeft: 10 }}>TOP UP</H3>
          </>}
          onClose={close}
        />

        {model.utxoLoading && <Modal.Loading />}

        <SendBody ref={topUpModalRef}>
          <SendTitle>Receive Address</SendTitle>
          <SendAmountContainer>
            <AddressCaption>{model.to}</AddressCaption>
            <Divider color="var(--sk-color-ntd10)"/>
          </SendAmountContainer>
          <SendTitle>Payment Method</SendTitle>
          <SendAmountContainer>
            <AddressCaption>{model.to}</AddressCaption>
            <Divider color="var(--sk-color-ntd10)"/>
          </SendAmountContainer>

          <BalanceContainer>
            <div />
            <BalanceBox>
              <H4>Balance</H4>
              <div>
                <Caption>{balanceText}</Caption>
                <BalanceUnit>{currentUnit}</BalanceUnit>
              </div>
            </BalanceBox>
          </BalanceContainer>
        </SendBody>
      </SendContainer>

      <SendContainer>
        <SendButtonContainer>
          <CancelButton onClick={close}>
            Cancel
          </CancelButton>
          <ConfirmModal model={model} parentNode={topUpModalRef.current} />
        </SendButtonContainer>
      </SendContainer>
    </>
  );
});

export default Initial;
