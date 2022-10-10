import React from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal, Transition } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useBalance } from "../../hook/useBalance";
import {useKeystoneStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel, CookieInfo, PrivacyLink } from "./styles"

const Account = observer(() => {
  const {persistDataLoaded,  runtime: {isLoading}, user: {isAgreeCookie, agreeCookie} } = useKeystoneStore();
  const { balance, rate, refresh } = useBalance();

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} rate={rate} />
          <Aside refreshBalance={refresh}/>
        </AccountContainer>
        <Transition visible={!isAgreeCookie && persistDataLoaded} animation={'fade up'} duration={'300'}>
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
        <AccountLabel>Powered by MetaMask Snaps</AccountLabel>
      </AccountBackground>
    </>
  );
});

export default Account;
