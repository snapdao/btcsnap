import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal, Transition } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useBalance } from "../../hook/useBalance";
import {useAppStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel, CookieInfo, PrivacyLink } from "./styles"
import { useRegisterXpub } from "../../hook/useRegisterXpub";
import LNSetupModal from '../SetupLightning';
import { AppStatus } from '../../mobx/runtime';
import { LNWalletStepStatus } from "../../mobx/user"

const Account = observer(() => {
  const {
    current,
    persistDataLoaded,
    runtime: {isLoading, status},
    user: {isAgreeCookie, agreeCookie, LNWalletStep, setLNWalletStep}
  } = useAppStore();
  const { balance, rate, refresh, loadingBalance } = useBalance();
  useRegisterXpub()

  useEffect(() => {
    if(!!current && status === AppStatus.Ready  && !loadingBalance && LNWalletStep === LNWalletStepStatus.Default){
      setLNWalletStep(LNWalletStepStatus.CreateWallet)
    }
  }, [current, status, loadingBalance])

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} rate={rate} />
          <Aside refreshBalance={refresh} loadingBalance={loadingBalance} />
          <AccountLabel>
            Powered by <a href='https://metamask.io/snaps/' target='_blank'>MetaMask Snaps </a>
            | Audited by <a href='https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20BTCSnap_en-us.pdf' target='_blank'>SlowMist</a>
          </AccountLabel>
        </AccountContainer>

        {LNWalletStep === LNWalletStepStatus.CreateWallet && <LNSetupModal />}

        {/*  TODO  make cookie visible by removing the false below */}
        <Transition visible={!isAgreeCookie && persistDataLoaded && false} animation={'fade up'} duration={'300'}>
          <CookieInfo>
            <div>
              <p>
                We use cookies to improve the user experience of our product. By continuing to use this site,
                you agree to our <PrivacyLink>Privacy Policy</PrivacyLink>.
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
