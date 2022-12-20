import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Caption, H4, Popup } from '../../kits';
import { Icon } from 'snapkit';
import { List } from '../../kits/List';
import { trackLightningReceive, trackLightningSend, trackTopUp, trackLightningWalletAmount } from '../../tracking';
import { AppStatus } from '../../mobx/runtime';

export interface MainProps {
  balance: number; // Satoshi
  loadingBalance: boolean
  loadingBalanceErrorMessage?: string
}

enum MainModal {
  Send,
  Receive,
  Details,
  TopUp,
}

const Main = observer(({ balance, loadingBalance, loadingBalanceErrorMessage }: MainProps) => {
  const {
    settings: { network },
    current,
    currentUnit,
    updateCurrentWalletUnit,
    currentWalletType,
    runtime: { continueConnect, currencyRate, status },
    lightning: { walletLength }
  } = useAppStore();
  const unit = bitcoinUnitMap[network];
  const [topUpVisibleData, setTopUpVisibleData] = useState<{
    open: boolean
    type: 'bitcoin' | 'lightningWalletInternal' | 'lightningWalletExternal'
  }>({
    open: false,
    type: 'bitcoin',
  });
  const [openedModal, setOpenedModal] = useState<MainModal | null>(null);
  const [secondaryUnit, setSecondaryUnit] = useState<BitcoinUnit>(
    currentUnit === BitcoinUnit.BTC ? BitcoinUnit.Sats : BitcoinUnit.BTC,
  );
  const isTestNetwork = network === BitcoinNetwork.Test;
  const currentBalance =
    currentUnit === BitcoinUnit.BTC ? satoshiToBTC(balance) : balance;

  const openModal = useCallback(
    (modal: MainModal) => {
      if (!current) {
        continueConnect();
        return;
      }
      setOpenedModal(modal);
      if (currentWalletType === WalletType.LightningWallet && [MainModal.Send, MainModal.Receive].includes(modal)) {
        const trackFn = MainModal.Send === modal ? trackLightningSend : trackLightningReceive;
        trackFn({
          step: 'entry'
        });
      }
    },
    [current, currentWalletType],
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

  function openTopUpModal(type: typeof topUpVisibleData['type']) {
    setOpenedModal(MainModal.TopUp);
    setTopUpVisibleData({
      open: false,
      type: type,
    });
    trackTopUp({
      type: type === 'bitcoin' ? 'bitcoin' : 'lightning',
      ...(type !== 'bitcoin' && {
        lightningType: type === 'lightningWalletInternal' ? 'internal' : 'external',
      }),
      step: 'entry',
    });
  };

  function setTopUpPopupVisible(open: boolean) {
    setTopUpVisibleData({
      ...topUpVisibleData,
      open,
    });
  }

  function setTopUpVisible() {
    if (network !== BitcoinNetwork.Main || currentWalletType !== WalletType.BitcoinWallet) return;
    openTopUpModal('bitcoin');
  }

  useEffect(() => {
    setSecondaryUnit(
      currentUnit === BitcoinUnit.BTC ? BitcoinUnit.Sats : BitcoinUnit.BTC,
    );
  }, [currentUnit, currentWalletType]);

  useEffect(() => {
    if (status === AppStatus.Ready && walletLength >= 1) {
      trackLightningWalletAmount(walletLength);
    }
  }, [walletLength]);

  const balanceText = !loadingBalance && !loadingBalanceErrorMessage && current ? currentBalance : '--';

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
              if (currentWalletType !== WalletType.BitcoinWallet) return; 
              openModal(MainModal.Details);
            }}>
            {balanceText} {unit[currentUnit]}
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
        <CurrencyContainer isTestnet={isTestNetwork}>
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
        <MarketPrice isTestnet={isTestNetwork}>
          Market Price: <span>{currencyRate} USD</span>
        </MarketPrice>

        <Popup
          open={topUpVisibleData.open}
          position={network === BitcoinNetwork.Main ? 'top right' : 'top center'}
          basic
          inverted={isTestNetwork}
          hoverable={false}
          openOnTriggerMouseEnter={false}
          closeOnTriggerMouseLeave={false}
          closeOnPortalMouseLeave={false}
          closeOnTriggerClick={false}
          onClose={() => setTopUpPopupVisible(false)}
          trigger={
            <span>
              <TopUpButton
                icon={
                  <Icon.TopUp
                    width='18px'
                    height='18px'
                    color='var(--sk-color-pri50)' />
                }
                onClick={() => {
                  if (isTestNetwork) return;
                  setTopUpPopupVisible(!topUpVisibleData.open);
                  setTopUpVisible();
                }}
                onMouseEnter={() => {
                  if (!isTestNetwork) return;
                  setTopUpPopupVisible(true);
                }}
                onMouseLeave={() => {
                  if (!isTestNetwork) return;
                  setTopUpPopupVisible(false);
                }}
                className={isTestNetwork ? 'disabled' : ''}
              >
                <H4>TOP UP</H4>
              </TopUpButton>
            </span>
          }
          style={network === BitcoinNetwork.Main ? { borderRadius: 16 } : {}}>
          {
            network === BitcoinNetwork.Main && currentWalletType === WalletType.LightningWallet
              ? <TopUpList>
                <List.Field
                  icon={<Icon.Wallet width='24px' height='24px' color='var(--sk-color-pri50)'/>}
                  title={<H4>With Your Wallet</H4>}
                  hoverable
                  onClick={() => openTopUpModal('lightningWalletInternal')}
                />
                <List.Field
                  icon={<Icon.WalletEx width='24px' height='24px'  color='var(--sk-color-n60)' />}
                  title={<H4>With External Wallet</H4>}
                  hoverable
                  onClick={() => openTopUpModal('lightningWalletExternal')}
                />
              </TopUpList>
              : isTestNetwork
                ? <Caption>Not available on Testnet</Caption>
                : null
          }
        </Popup>
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
