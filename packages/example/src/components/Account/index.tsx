import { useEffect } from 'react';
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
} from './styles';
import { LNSetupModal } from '../Lightning';
import { AppStatus } from '../../mobx/runtime';
import { LNWalletStepStatus } from '../../mobx/user';
import { useCurrencyRate } from "../../hook/useCurrencyRate";

const Account = observer(() => {
  const {
    current,
    persistDataLoaded,
    runtime: { isLoading, status },
    user: { isAgreeCookie, agreeCookie, LNWalletStep, setLNWalletStep },
  } = useAppStore();
  const { balance, refresh, loadingBalance } = useBalance();
  const { refreshCurrencyRate } = useCurrencyRate();
  useRegisterXpub()

  const currentReadyLoaded =
    !!current &&
    status === AppStatus.Ready &&
    LNWalletStep === LNWalletStepStatus.Default;

  useEffect(() => {
    if (currentReadyLoaded && !loadingBalance) {
      setLNWalletStep(LNWalletStepStatus.Ready);
    }
  }, [current, status, loadingBalance]);

  return (
    <>
      <Modal open={isLoading}>
        <Loader inverted />
      </Modal>

      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} />
          <Aside refreshBalance={refresh} loadingBalance={loadingBalance} />
          <AccountLabel>
            Powered by{' '}
            <a href="https://metamask.io/snaps/" target="_blank">
              MetaMask Snaps{' '}
            </a>
            | Audited by <a href='https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20BTCSnap_en-us.pdf' target='_blank'>SlowMist</a>
          </AccountLabel>
        </AccountContainer>

        <LNSetupModal />

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
