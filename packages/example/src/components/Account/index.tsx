import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Transition } from 'semantic-ui-react';
import { useRegisterXpub } from '../../hook/useRegisterXpub';
import Main from './Main';
import Aside from './Aside';
import { useBalance } from '../../hook/useBalance';
import { useAppStore } from '../../mobx';
import {
  AccountBackground,
  AccountContainer,
  AccountLabel,
  CookieInfo,
} from './styles';
import { AppStatus } from '../../mobx/runtime';
import { LNWalletStepStatus } from '../../mobx/user';
import { useCurrencyRate } from '../../hook/useCurrencyRate';
import { WalletType } from '../../interface';
import { Message, MessageType, Modal } from '../../kits';
import LightningAppStatus from '../Lightning/AppStatus';

const Account = observer(() => {
  const {
    current,
    persistDataLoaded,
    runtime: { isLoading, status },
    user: { isAgreeCookie, agreeCookie, LNWalletStep, setLNWalletStep },
    currentWalletType,
  } = useAppStore();
  const { balance, refresh, loadingBalance, errorMessage } = useBalance();
  useCurrencyRate();
  useRegisterXpub();

  // useEffect(() => {
  //   const currentAccountReady =
  //     !!current &&
  //     status === AppStatus.Ready &&
  //     !loadingBalance;
  //   const shouldShowLNGuide = LNWalletStep === LNWalletStepStatus.Default;
  //   if (currentAccountReady && shouldShowLNGuide) {
  //     setLNWalletStep(LNWalletStepStatus.Ready);
  //   }
  // }, [current, status, LNWalletStep, loadingBalance]);

  return (
    <>
      {isLoading && <Modal.Loading
        inModal={false}
        content={status === AppStatus.Register
          ? 'Initializing, it will take about 5 seconds.'
          : ''}
      ></Modal.Loading>}

      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} loadingBalance={loadingBalance} loadingBalanceErrorMessage={errorMessage} />
          <Aside refreshBalance={refresh} loadingBalance={loadingBalance} />

          {currentWalletType === WalletType.BitcoinWallet && (
            <AccountLabel>
              Powered by{' '}
              <a href='https://metamask.io/snaps/' target='_blank' rel='noreferrer'>
                MetaMask Snaps{' '}
              </a>
              | Audited by <a href='https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20BTCSnap_en-us.pdf' target='_blank' rel='noreferrer'>SlowMist</a>
            </AccountLabel>
          )}

          {currentWalletType === WalletType.LightningWallet && (
            <AccountLabel>
              Powered by{' '}
              <a href='https://lndhub.io/' target='_blank' rel='noreferrer'>
                LNDHub
              </a>
            </AccountLabel>
          )}

          {errorMessage && <Message type={MessageType.Error}>{errorMessage}</Message>}

          <LightningAppStatus />
        </AccountContainer>

        {/*  TODO  make cookie visible by removing the false below */}
        <Transition
          visible={!isAgreeCookie && persistDataLoaded && false}
          animation={'fade up'}
          duration={'300'}>
          <CookieInfo>
            <div>
              <p>
                We use cookies to improve the user experience of our product. By
                continuing to use this site, you agree to our Privacy Policy.
              </p>
              <span onClick={agreeCookie}>OK</span>
            </div>
          </CookieInfo>
        </Transition>
      </AccountBackground>
    </>
  );
});

export default Account;
