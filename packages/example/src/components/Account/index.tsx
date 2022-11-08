import React from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal, Transition } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useBalance } from "../../hook/useBalance";
import {useAppStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel, CookieInfo, PrivacyLink } from "./styles"

const Account = observer(() => {
  const { persistDataLoaded, runtime: {isLoading}, user: {isAgreeCookie, agreeCookie} } = useAppStore();
  const { balance, rate, refresh, loadingBalance } = useBalance();

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} rate={rate} />
          <Aside refreshBalance={refresh} loadingBalance={loadingBalance}/>
          <AccountLabel>
            Powered by <a href='https://metamask.io/snaps/' target='_blank'>MetaMask Snaps </a>
          </AccountLabel>
        </AccountContainer>
        {/*  TODO  make cookie visible by removing the false below */}
        <Transition visible={!isAgreeCookie && persistDataLoaded && false} animation={'fade up'} duration={'300'}>
          <CookieInfo>
            <div>
              <p>
                We use cookies to improve the user experience of our product. By continuing to use this site,
                you agree to our Privacy Policy.
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
