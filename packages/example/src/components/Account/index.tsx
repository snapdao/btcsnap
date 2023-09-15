import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRegisterXpub } from '../../hook/useRegisterXpub';
import Main from './Main';
import Aside from './Aside';
import { useBalance } from '../../hook/useBalance';
import { useAppStore } from '../../mobx';
import { AccountHeader, AccountLabel } from './styles';
import { useCurrencyRate } from '../../hook/useCurrencyRate';
import { WalletType } from '../../interface';
import { Message, MessageType } from '../../kits';
import LightningAppStatus from '../Lightning/AppStatus';
import { Background } from '../Background';
import { useNetworkCheck } from '../../hook/useNetworkCheck';

const Account = observer(() => {
  const {
    runtime: { isLoading },
    currentWalletType,
  } = useAppStore();
  const { balance, refresh, loadingBalance, errorMessage } = useBalance();
  useCurrencyRate();
  useRegisterXpub();
  const { isSettingNetwork, networkMessage } = useNetworkCheck();

  return (
    <Background
      loading={isLoading || isSettingNetwork}
      loadingTip={isSettingNetwork ? <div><p>Continue at MetaMask</p><p>Please confirm your network type.</p></div> : ''}
    >
      <AccountHeader>
        {networkMessage && <Message type={MessageType.Info}>{networkMessage}</Message>}
      </AccountHeader>

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

      {errorMessage && <Message type={MessageType.Error}>{errorMessage}</Message>}

      <LightningAppStatus />
    </Background>
  );
});

export default Account;
