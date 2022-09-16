import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';

import './index.css';
import ConfirmModal from "./ConfirmModal";
import TransactionFee from "./TransactionFee"
import CloseIcon from "../Icons/CloseIcon";
import SendIcon from "../Icons/SendIcon";
import SwitchIcon from "../Icons/SwitchIcon";
import ArrowDown from '../Icons/ArrowDown';

import {
  SendContainer,
  SendHeader,
  SendHeaderLabel,
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
  SendAvailable,
  SendToContainer,
  SendToInput,
  SendButtonContainer,
  CancelButton,
} from "./styles";

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const Initial: FunctionComponent<InitialProps> = observer(({ model, close }) => {
  const [transactionFee, setTransactionFee] = useState<boolean>(false);

  const openTransactionFee = () => {
    setTransactionFee(true);
  }

  const closeTransactionFee = () => {
    setTransactionFee(false);
  }

  return (
    <>
      <SendContainer>
        <SendHeader>
          <SendHeaderLabel>
            <SendIcon size={36} />
            <h3>SEND</h3>
          </SendHeaderLabel>
          <CloseIcon onClick={close} />
        </SendHeader>

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
                  placeholder="0"
                />
                <span onClick={() => model.switchUnits()}>{model.mainUnits}<SwitchIcon /></span>
              </SendAmountInput>
              <SendAmountMax onClick={() => model.availableMaxBtc()}>MAX</SendAmountMax>
            </SendAmountItem>

            {!model.amountValid && (<SendTextError>Insufficient Funds</SendTextError>)}

            <SendAmountItem>
              <SendAmountTransition><span>{model.sendAmountSecondary}</span><span>{model.secondaryUnits}</span></SendAmountTransition>
              <SendAmountFee>
                <SendTitle>Fee</SendTitle>
                <span onClick={openTransactionFee}>
                  <span>{model.feeText}</span>
                  <span>{model.mainUnits}</span>
                  <ArrowDown />
                </span>
              </SendAmountFee>
            </SendAmountItem>
          </SendAmountContainer>

          <TransactionFee open={transactionFee} close={closeTransactionFee} model={model} />

          <DividerLine />

          <SendAvailableContainer>
            <SendTitle>Available</SendTitle>
            <SendAvailable>
              <span>{model.availableBtc}</span>
              <span>{model.unit}</span>
              <span>/</span>
              <span>{model.availableCurrency}</span>
              <span>USD</span>
            </SendAvailable>
          </SendAvailableContainer>
        </SendBody>
      </SendContainer>

      <SendContainer>
        <SendToContainer>
          <SendTitle>To</SendTitle>
          <SendToInput>
            <input
              placeholder="Paste or input the destination address"
              value={model.to}
              onChange={e => {model.setTo(e.target.value)}}
            />
          </SendToInput>

          {!model.toValid && (<SendTextError>Enter a Valid Wallet Address</SendTextError>)}
        </SendToContainer>

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
