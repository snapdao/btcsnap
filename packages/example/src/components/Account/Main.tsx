import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from "../../mobx";
import { BitcoinNetwork, BitcoinUnit } from "../../interface";
import SendModal from '../SendModal';
import ReceiveModal from '../ReceiveModal'
import AccountDetail from './Details';
import {
  AccountMain,
  ActionButton,
  ActionContainer,
  ActionContainerItem,
  ActionLabel,
  BalanceLeftArrow,
  BalanceLeftItem,
  BalanceLeftLabel,
  BalanceRightItem,
  BalanceRightLabel,
  BalanceRightLine,
  BalanceContainer,
  BalanceLabel,
  CurrencyContainer,
  LogoContainer,
  TestnetSpan,
  MarketPrice
} from './styles'

import { ReactComponent as Logo } from "./image/logo.svg";
import { ReactComponent as LogoTestnet } from "./image/logo-testnet.svg";
import ReceiveIcon from "../Icons/ReceiveIcon";
import ArrowRight from "../Icons/ArrowRight";
import { bitcoinUnitMap } from "../../lib/unit"
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
  const { settings: { network }, current, runtime: {continueConnect}} = useAppStore();
  const unit = bitcoinUnitMap[network];
  const [openedModal, setOpenedModal] = useState<MainModal | null>(null)
  const [mainUnit, setMainUnit] = useState<BitcoinUnit>(BitcoinUnit.BTC);
  const [secondaryUnit, setSecondaryUnit] = useState<BitcoinUnit>(BitcoinUnit.Sats);
  const currentBalance = mainUnit === BitcoinUnit.BTC ? satoshiToBTC(balance) : balance;

  const openModal = useCallback((modal: MainModal) => {
    if(!current) {
      continueConnect();
      return
    }
    setOpenedModal(modal);
  }, [current])

  const closeModal = useCallback(() => {
    setOpenedModal(null);
  }, [])

  const switchUnits = () => {
    if(!current) {
      continueConnect();
      return
    }
    setMainUnit(secondaryUnit);
    setSecondaryUnit(mainUnit);
  }

  return (
    <AccountMain>
      <LogoContainer>
        {network === BitcoinNetwork.Main
          ? <Logo />
          : <><LogoTestnet /><TestnetSpan>Testnet</TestnetSpan></>
        }
      </LogoContainer>

      <BalanceContainer>
        <BalanceLabel>current balance</BalanceLabel>
        <BalanceLeftItem>
          <BalanceLeftLabel onClick={() => {openModal(MainModal.Details)}}>
            {currentBalance} {unit[mainUnit]}
          </BalanceLeftLabel>
          <BalanceLeftArrow><ArrowRight size={25}/></BalanceLeftArrow>
        </BalanceLeftItem>
        <BalanceRightItem>
          <BalanceRightLine>/</BalanceRightLine>
          <BalanceRightLabel onClick={switchUnits}>{unit[secondaryUnit]}</BalanceRightLabel>
        </BalanceRightItem>
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

      { openedModal === MainModal.Details &&
        <AccountDetail
          open={openedModal === MainModal.Details}
          balance={currentBalance}
          unit={unit[mainUnit]}
          close={closeModal}
        />
      }

      { openedModal === MainModal.Send &&
        <SendModal
          network={network}
          unit={mainUnit}
          scriptType={current?.scriptType!}
          close={closeModal}
          currencyRate={rate}
        />
      }

      { openedModal === MainModal.Receive && <ReceiveModal open={openedModal === MainModal.Receive} close={closeModal}/> }
    </AccountMain>
  );
});

export default Main;
