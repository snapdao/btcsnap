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
  DividerLine,
  SendAvailableContainer,
  SendButtonContainer,
  CancelButton,
  SendAvailableBox,
  BalanceBox,
  BalanceUnit,
} from './styles';
import { Icon } from 'snapkit';
import { Body, Caption, H3, H4, Modal } from '../../../kits';
import BitcoinIcon2 from '../../Icons/BitcoinIcon2';
import { BalanceContainer } from './styles';
import { useAppStore } from '../../../mobx';
import { useBalance } from '../../../hook/useBalance';
import { BitcoinUnit, WalletType } from '../../../interface';
import { satoshiToBTC } from '../../../lib/helper';
import { bitcoinUnitMap } from '../../../lib/unit';

export type InitialProps = {
  model: SendViewModel;
  close: () => void;
};

const numberReg = /^\d*(?:\.\d*)?$/;

const Initial: FunctionComponent<InitialProps> = observer(({ model, close }) => {
  const { currentUnit } = useAppStore();
  const { balance } = useBalance({ type: WalletType.BitcoinWallet });
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
          <SendTitle>Amount</SendTitle>
          <SendAmountContainer>
            <SendAmountItem>
              <SendAmountInput>
                <input
                  autoFocus
                  size={model.amountLength}
                  value={model.sendAmountMain}
                  onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                    const value = ev.target.value.trim();
                    const banList = ['-', '00', '.'].includes(value);
                    const [int, dec] = value.split('.');

                    const isBTC = model.mainUnit === BitcoinUnit.BTC;
                    const isSatoshi = model.mainUnit === bitcoinUnitMap.mainnet.sats;
                    const currDecMaxLen = {
                      [bitcoinUnitMap.mainnet.BTC]: 8,
                      [bitcoinUnitMap.mainnet.Currency]: 2,
                      [bitcoinUnitMap.mainnet.sats]: 0,
                    }[model.mainUnit];
                    const intMaxLen = int.length > (isBTC ? 2 : 9);
                    const decMaxLen = dec && dec.length > currDecMaxLen;

                    const isDisDotInput = isSatoshi && value?.at(-1) === '.';

                    if (
                      !numberReg.test(value) ||
                      banList ||
                      Number(value) < 0 ||
                      intMaxLen ||
                      decMaxLen ||
                      isDisDotInput
                    )
                      return;
                    model.handleSendInput(ev.target.value);
                  }}
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
                  <span>{!showFee ? '--' : model.feeText}</span>
                  <span>{model.mainUnit}</span>
                  <ArrowDown />
                </span>
              </SendAmountFee>
            </SendAmountItem>
          </SendAmountContainer>

          <TransactionFee open={transactionFee} showFee={showFee} close={closeTransactionFee} model={model} />

          <DividerLine />

          <SendAvailableContainer>
            <SendTitle>Payment Method</SendTitle>
            <SendAvailableBox>
              <BitcoinIcon2 size={20} />
              <Body>Bitcoin Wallet</Body>
            </SendAvailableBox>
          </SendAvailableContainer>
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
