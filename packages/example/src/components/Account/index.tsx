import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Loader, Modal, Transition } from 'semantic-ui-react';
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
import LNSetupModal from '../Lightning';
import { AppStatus } from '../../mobx/runtime';
import { LNWalletStepStatus } from '../../mobx/user';
import { LightningContext, LightningContextProvider } from '../Lightning/ctx';

const Account = observer(() => {
  const {
    current,
    persistDataLoaded,
    runtime: { isLoading, status },
    user: { isAgreeCookie, agreeCookie, LNWalletStep, setLNWalletStep },
  } = useAppStore();
  const { balance, rate, refresh, loadingBalance } = useBalance();

  useEffect(() => {
    if (
      !!current &&
      status === AppStatus.Ready &&
      !loadingBalance &&
      LNWalletStep === LNWalletStepStatus.Default
    ) {
      onShowCreateWallet();
    }
  }, [current, status, loadingBalance]);

  const createWallet = () => {
    onShowCreateWallet();
    setLNWalletStep(LNWalletStepStatus.Done);
  };

  const { state, update } = useContext(LightningContext);

  const onShowCreateWallet = () => {
    setLNWalletStep(LNWalletStepStatus.CreateWallet);
    update({
      ...state,
      setupStep: 'createWallet',
    });
  };

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>

      <LightningContextProvider>
        <AccountBackground>
          <AccountContainer>
            <Main balance={balance} rate={rate} />
            <Aside refreshBalance={refresh} loadingBalance={loadingBalance} />
            <AccountLabel>
              Powered by{' '}
              <a href="https://metamask.io/snaps/" target="_blank">
                MetaMask Snaps{' '}
              </a>
            </AccountLabel>
          </AccountContainer>

          <LNSetupModal createWallet={createWallet} />

          <Transition
            visible={!isAgreeCookie && persistDataLoaded}
            animation={'fade up'}
            duration={'300'}>
            <CookieInfo>
              <div>
                <p>
                  We use cookies to improve the user experience of our product.
                  By continuing to use this site, you agree to our Privacy
                  Policy.
                </p>
                <span onClick={agreeCookie}>OK</span>
              </div>
            </CookieInfo>
          </Transition>
        </AccountBackground>
      </LightningContextProvider>
    </>
  );
});

export default Account;
