import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Loader, Modal, Transition } from 'semantic-ui-react';
import { useRegisterXpub } from "../../hook/useRegisterXpub";
import Main from './Main';
import Aside from './Aside';
import { useBalance } from '../../hook/useBalance';
import { useAppStore } from '../../mobx';
import {
  AccountBackground,
  AccountContainer,
  AccountLabel,
  CookieInfo,
  PrivacyLink,
} from './styles';
import LNSetupModal from '../SetupLightning';
import { AppStatus } from '../../mobx/runtime';
import { LNWalletStepStatus } from '../../mobx/user';
import CreateWallet from '../SetupLightning/CreateWallet';
import RecoveryKey from '../SetupLightning/RecoveryKey';
import { useLNWallet } from '../../hook/useLNWallet';
import { WalletType } from '../../interface';
import { getLNWalletData, KeyOptions } from '../../lib/snap';

const Account = observer(() => {
  const {
    current,
    persistDataLoaded,
    runtime: { isLoading, status },
    user: { isAgreeCookie, agreeCookie, LNWalletStep, setLNWalletStep },
  } = useAppStore();
  const { balance, rate, refresh, loadingBalance } = useBalance();
  useRegisterXpub()

  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState({
    show: false,
    key: '',
  });

  useEffect(() => {
    if (
      !!current &&
      status === AppStatus.Ready &&
      !loadingBalance &&
      LNWalletStep === LNWalletStepStatus.Default
    ) {
      setLNWalletStep(LNWalletStepStatus.CreateWallet);
    }
  }, [current, status, loadingBalance]);

  const createWallet = () => {
    onShowCreateWallet();
    setLNWalletStep(LNWalletStepStatus.Done);
  };

  const onCloseCreateWallet = () => {
    setShowCreateWallet(false);
  };

  const lnWallet = useLNWallet();
  const onCreateLightning = async (name: string) => {
    try {
      await lnWallet.create(name);
    } catch (e) {
      console.error('create lightning error', e);
    }
  };

  useEffect(() => {
    const credential = lnWallet.wallet?.credential;
    if (!credential) return;
    const key = `lndhub://${credential.login}:${credential.password}@https://lndhub.io`;
    setShowCreateWallet(false);
    setRecoveryKey({
      show: true,
      key,
    });
  }, [lnWallet.wallet]);

  const onShowCreateWallet = async () => {
    setShowCreateWallet(true);
  };

  const onCloseRecoveryKey = () => {
    setRecoveryKey({
      show: false,
      key: '',
    });
  };

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} rate={rate} />
          <Aside
            refreshBalance={refresh}
            loadingBalance={loadingBalance}
            showCreateWallet={onShowCreateWallet}
          />
          <AccountLabel>
            Powered by{' '}
            <a href="https://metamask.io/snaps/" target="_blank">
              MetaMask Snaps{' '}
            </a>
            | Audited by <a href='https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20BTCSnap_en-us.pdf' target='_blank'>SlowMist</a>
          </AccountLabel>
        </AccountContainer>

        {LNWalletStep === LNWalletStepStatus.CreateWallet && (
          <LNSetupModal createWallet={createWallet} />
        )}
        {showCreateWallet && (
          <CreateWallet
            create={onCreateLightning}
            loading={lnWallet.createLoading}
            close={onCloseCreateWallet}
          />
        )}
        {recoveryKey.show && (
          <RecoveryKey
            recoveryKey={recoveryKey.key}
            close={onCloseRecoveryKey}
          />
        )}

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
