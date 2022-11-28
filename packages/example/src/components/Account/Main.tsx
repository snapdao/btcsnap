import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../mobx';
import { BitcoinNetwork, BitcoinScriptType, BitcoinUnit, WalletType } from '../../interface';
import SendModal from '../SendModal';
import TopUpModal from '../TopUpModal';
import ReceiveModal from '../ReceiveModal';
import AccountDetail from './Details';
import {
  AccountMain,
  ActionButton,
  ActionContainer,
  ActionContainerItem,
  ActionLabel,
  BalanceContainer,
  BalanceLabel,
  BalanceLeftArrow,
  BalanceLeftItem,
  BalanceLeftLabel,
  BalanceRightItem,
  BalanceRightLabel,
  BalanceRightLine,
  CurrencyContainer,
  LogoContainer,
  TestnetSpan,
  MarketPrice,
  Footer,
  TopUpButton,
  TopUpList,
} from './styles';

import { ReactComponent as Logo } from './image/logo.svg';
import { ReactComponent as LogoTestnet } from './image/logo-testnet.svg';
import ReceiveIcon from '../Icons/ReceiveIcon';
import ArrowRight from '../Icons/ArrowRight';
import { bitcoinUnitMap } from '../../lib/unit';
import SendIcon from '../Icons/SendIcon';
import { satoshiToBTC } from '../../lib/helper';
import { PayInvoice } from '../Lightning/PayInvoice';
import LightningReceiveModal from '../Lightning/ReceiveModal';
import { H4, Popup } from '../../kits';
import { Icon } from 'snapkit';
import { List } from '../../kits/List';

export interface MainProps {
  balance: number; // Satoshi
}

enum MainModal {
  Send,
  Receive,
  Details,
  TopUp,
}

const Main = observer(({ balance }: MainProps) => {
  const {
    settings: { network },
    current,
    currentUnit,
    updateCurrentWalletUnit,
    currentWalletType,
    runtime: { continueConnect, currencyRate },
  } = useAppStore();
  const unit = bitcoinUnitMap[network];
  const [topUpVisibleData, setTopUpVisibleData] = useState<{
    open: boolean
    type: 'wallet' | 'externalWallet'
  }>({
    open: false,
    type: 'wallet'
  });
  const [openedModal, setOpenedModal] = useState<MainModal | null>(null);
  const [secondaryUnit, setSecondaryUnit] = useState<BitcoinUnit>(
    currentUnit === BitcoinUnit.BTC ? BitcoinUnit.Sats : BitcoinUnit.BTC,
  );
  const currentBalance =
    currentUnit === BitcoinUnit.BTC ? satoshiToBTC(balance) : balance;

  const openModal = useCallback(
    (modal: MainModal) => {
      if (!current) {
        continueConnect();
        return;
      }
      setOpenedModal(modal);
    },
    [current],
  );

  const closeModal = useCallback(() => {
    setOpenedModal(null);
  }, []);

  const switchUnits = () => {
    if (!current) {
      continueConnect();
      return;
    }
    updateCurrentWalletUnit(secondaryUnit);
    setSecondaryUnit(currentUnit);
  };

  function openTopUpModal(type: 'wallet' | 'externalWallet') {
    setOpenedModal(MainModal.TopUp);
    setTopUpVisibleData({
      open: false,
      type
    });
  };

  function setTopUpVisible(open: boolean) {
    setTopUpVisibleData({
      ...topUpVisibleData,
      open,
    });
  }

  useEffect(() => {
    setSecondaryUnit(
      currentUnit === BitcoinUnit.BTC ? BitcoinUnit.Sats : BitcoinUnit.BTC,
    );
  }, [currentWalletType]);

  return (
    <AccountMain>
      <LogoContainer>
        {network === BitcoinNetwork.Main ? (
          <Logo />
        ) : (
          <>
            <LogoTestnet />
            <TestnetSpan>Testnet</TestnetSpan>
          </>
        )}
      </LogoContainer>

      <BalanceContainer>
        <BalanceLabel>current balance</BalanceLabel>
        <BalanceLeftItem hoverable={currentWalletType === WalletType.BitcoinWallet}>
          <BalanceLeftLabel
            onClick={() => {
              if(currentWalletType === WalletType.BitcoinWallet) {
                openModal(MainModal.Details);
              }
            }}>
            {currentBalance} {unit[currentUnit]}
          </BalanceLeftLabel>
          <BalanceLeftArrow>
            <ArrowRight size={25} />
          </BalanceLeftArrow>
        </BalanceLeftItem>
        <BalanceRightItem>
          <BalanceRightLine>/</BalanceRightLine>
          <BalanceRightLabel onClick={switchUnits}>
            {unit[secondaryUnit]}
          </BalanceRightLabel>
        </BalanceRightItem>
        <CurrencyContainer isTestnet={network === BitcoinNetwork.Test}>
          ≈ {(satoshiToBTC(balance) * currencyRate).toFixed(2)} USD
        </CurrencyContainer>
      </BalanceContainer>

      <ActionContainer>
        <ActionContainerItem
          onClick={() => {
            openModal(MainModal.Send);
          }}>
          <ActionButton>
            <SendIcon size={48} />
          </ActionButton>
          <ActionLabel>send</ActionLabel>
        </ActionContainerItem>
        <ActionContainerItem
          onClick={() => {
            openModal(MainModal.Receive);
          }}>
          <ActionButton>
            <ReceiveIcon size={48} />
          </ActionButton>
          <ActionLabel>receive</ActionLabel>
        </ActionContainerItem>
      </ActionContainer>

      <Footer>
        <MarketPrice isTestnet={network === BitcoinNetwork.Test}>
          Market Price: <span>{currencyRate} USD</span>
        </MarketPrice>

        {currentWalletType === WalletType.LightningWallet && (
          <Popup
            open={topUpVisibleData.open}
            position='top right'
            basic
            inverted={false}
            hoverable={false}
            openOnTriggerMouseEnter={false}
            closeOnTriggerMouseLeave={false}
            closeOnPortalMouseLeave={false}
            onClose={() => setTopUpVisible(false)}
            trigger={
              <span>
                <TopUpButton
                  icon={
                    <Icon.TopUp
                      width='18px'
                      height='18px'
                      color='var(--sk-color-pri50)' />
                  }
                  onClick={() => setTopUpVisible(!topUpVisibleData.open)}
                >
                  <H4>TOP UP</H4>
                </TopUpButton>
              </span>
            }
            style={{ borderRadius: 16 }}>
            <TopUpList>
              <List.Field
                icon={<Icon.Wallet width='24px' height='24px' color='var(--sk-color-pri50)'/>}
                title={<H4>With Your Wallet</H4>}
                hoverable
                onClick={() => openTopUpModal('wallet')}
              />
              <List.Field
                icon={<Icon.WalletEx width='24px' height='24px'  color='var(--sk-color-n60)' />}
                title={<H4>With External Wallet</H4>}
                hoverable
                onClick={() => openTopUpModal('externalWallet')}
              />
            </TopUpList>
          </Popup>
        )}
      </Footer>

      {openedModal === MainModal.Details && (
        <AccountDetail
          open={openedModal === MainModal.Details}
          balance={currentBalance}
          unit={unit[currentUnit]}
          close={closeModal}
        />
      )}

      {openedModal === MainModal.Send ? (
        currentWalletType === WalletType.BitcoinWallet ? (
          <SendModal
            network={network}
            unit={currentUnit}
            scriptType={current?.scriptType as BitcoinScriptType}
            close={closeModal}
            currencyRate={currencyRate}
          />
        ) : (
          <PayInvoice
            balance={balance}
            close={closeModal}
            exchangeRate={currencyRate}
          />
        )
      ) : null}

      {openedModal === MainModal.Receive &&
        {
          [WalletType.BitcoinWallet]: (
            <ReceiveModal
              open={openedModal === MainModal.Receive}
              close={closeModal}
            />
          ),
          [WalletType.LightningWallet]: (
            <LightningReceiveModal
              close={closeModal}
              currencyRate={currencyRate}
            />
          ),
        }[currentWalletType]}

      {openedModal === MainModal.TopUp && (
        <TopUpModal
          type={topUpVisibleData.type}
          walletProps={{
            network,
            unit: currentUnit,
            scriptType: current?.scriptType as BitcoinScriptType,
            currencyRate
          }}
          close={closeModal}
        />
      )}
    </AccountMain>
  );
});

export default Main;
