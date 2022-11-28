import React, { FunctionComponent, useState } from 'react';
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
  DividerLine,
  SendAvailableContainer,
  SendButtonContainer,
  CancelButton,
  SendAvailableBox,
} from './styles';
import { Icon } from 'snapkit';
import { Body, H3, Modal } from '../../../kits';
import BitcoinIcon2 from '../../Icons/BitcoinIcon2';

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const Initial: FunctionComponent<InitialProps> = observer(({ model, close }) => {
  const [transactionFee, setTransactionFee] = useState<boolean>(false);

  const openTransactionFee = () => {
    setTransactionFee(true);
  };

  const closeTransactionFee = () => {
    setTransactionFee(false);
  };

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

        <SendBody>
          <SendTitle>Amount</SendTitle>
          <SendAmountContainer>
            <SendAmountItem>
              <SendAmountInput>
                <input
                  autoFocus
                  size={model.amountLength}
                  value={model.sendAmountMain}
                  onChange={e => { model.handleSendInput(e.target.value); }}
                  placeholder='0'
                />
                <span onClick={() => model.switchUnits()}>{model.mainUnit}<SwitchIcon /></span>
              </SendAmountInput>
              <SendAmountMax onClick={() => {
                if(model.availableAmount){
                  model.availableMax();
                }
              }}>MAX</SendAmountMax>
            </SendAmountItem>

            {!model.amountValid.valid && !model.utxoLoading && (<SendTextError>{model.amountValid.msg}</SendTextError>)}

            <SendAmountItem>
              <SendAmountTransition><span>{model.sendAmountSecondary}</span><span>{model.secondaryUnit}</span></SendAmountTransition>
              <SendAmountFee>
                <SendTitle>Fee</SendTitle>
                <span onClick={openTransactionFee}>
                  <span>{model.feeText}</span>
                  <span>{model.mainUnit}</span>
                  <ArrowDown />
                </span>
              </SendAmountFee>
            </SendAmountItem>
          </SendAmountContainer>

          <TransactionFee open={transactionFee} close={closeTransactionFee} model={model} />

          <DividerLine />

          <SendAvailableContainer>
            <SendTitle>Payment Method</SendTitle>
            <SendAvailableBox>
              <BitcoinIcon2 size={20} />
              <Body>Bitcoin Wallet</Body>
            </SendAvailableBox>
          </SendAvailableContainer>
        </SendBody>
      </SendContainer>

      <SendContainer>
        <SendButtonContainer>
          <CancelButton onClick={close}>
            Cancel
          </CancelButton>
          <ConfirmModal model={model} />
        </SendButtonContainer>
      </SendContainer>
    </>
  );
});

export default Initial;
