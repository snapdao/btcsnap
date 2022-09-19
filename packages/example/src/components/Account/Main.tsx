import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork } from "../../interface";
import SendModal from '../SendModal';
import ReceiveModal from '../ReceiveModal'
import AccountDetail from './Details';
import {
  AccountMain,
  ActionButton,
  ActionContainer,
  ActionContainerItem,
  ActionLabel,
  BalacneLeftArrow,
  BalacneLeftItem,
  BalacneLeftLabel,
  BalacneRightItem,
  BalacneRightLabel,
  BalacneRightLine,
  BalanceContainer,
  BalanceLabel,
  CurrencyContainer,
  LogoContainer,
  MarketPrice
} from './styles'

import { ReactComponent as Logo } from "./image/logo.svg";
import { ReactComponent as LogoTestnet } from "./image/logo-testnet.svg";
import ReceiveIcon from "../Icons/ReceiveIcon";
import ArrowRight from "../Icons/ArrowRight";
import { bitcoinUnitMap, Unit } from "../../lib/unit"
import SendIcon from "../Icons/SendIcon";
import { satoshiToBTC } from "../../lib/helper";

export interface MainProps {
  balance: number; // Satoshi
  rate: number;
}

enum MainModal {
  Send,
  Receive,
  Details
}

const Main = observer(({balance, rate}: MainProps) => {
  const { settings: { network }, current } = useKeystoneStore();
  const unit = bitcoinUnitMap[network];
  const [openedModal, setOpenedModal] = useState<MainModal | null>(null)
  const [mainUnit, setMainUnit] = useState<Unit>(Unit.BTC);
  const [secondaryUnit, setSecondaryUnit] = useState<Unit>(Unit.Sats);
  const currentBalance = mainUnit === Unit.BTC ? satoshiToBTC(balance) : balance

  const openModal = useCallback((modal: MainModal) => {
    setOpenedModal(modal);
  }, [])

  const closeModal = useCallback(() => {
    setOpenedModal(null);
  }, [])

  const switchUnits = () => {
    setMainUnit(secondaryUnit);
    setSecondaryUnit(mainUnit);
  }

  return (
    <AccountMain>
      <LogoContainer>
        {network === BitcoinNetwork.Main
          ? <Logo />
          : <LogoTestnet />
        }
      </LogoContainer>

      <BalanceContainer>
        <BalanceLabel>current balance</BalanceLabel>
        <BalacneLeftItem>
          <BalacneLeftLabel onClick={() => {openModal(MainModal.Details)}}>
            {currentBalance} {unit[mainUnit]}
          </BalacneLeftLabel>
          <BalacneLeftArrow><ArrowRight size={25}/></BalacneLeftArrow>
        </BalacneLeftItem>
        <BalacneRightItem>
          <BalacneRightLine>/</BalacneRightLine>
          <BalacneRightLabel onClick={switchUnits}>{unit[secondaryUnit]}</BalacneRightLabel>
        </BalacneRightItem>
        <CurrencyContainer isTestnet={network === BitcoinNetwork.Test}>
          ≈ {(satoshiToBTC(balance) * rate).toFixed(2)} USD
        </CurrencyContainer>
      </BalanceContainer>

      <ActionContainer>
        <ActionContainerItem onClick={() => {openModal(MainModal.Send)}}>
          <ActionButton>
            <SendIcon size={48} />
          </ActionButton>
          <ActionLabel>send</ActionLabel>
        </ActionContainerItem>
        <ActionContainerItem onClick={() => {openModal(MainModal.Receive)}}>
          <ActionButton>
            <ReceiveIcon size={48} />
          </ActionButton>
          <ActionLabel>receive</ActionLabel>
        </ActionContainerItem>
      </ActionContainer>

      <MarketPrice isTestnet={network === BitcoinNetwork.Test}>
        Market Price: <span>{rate} USD</span>
      </MarketPrice>

      { openedModal === MainModal.Details && <AccountDetail balance={currentBalance} unit={unit[mainUnit]} close={closeModal} /> }
      { openedModal === MainModal.Send &&
        <SendModal
          network={network}
          unit={unit[mainUnit]}
          scriptType={current?.scriptType!}
          close={closeModal}
          currencyRate={rate}
        />
      }
      { openedModal === MainModal.Receive && <ReceiveModal close={closeModal}/> }
    </AccountMain>
  );
});

export default Main;
