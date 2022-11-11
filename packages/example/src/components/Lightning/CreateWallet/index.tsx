import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as LightningIcon } from './image/lightning.svg';
import CloseIcon from '../../Icons/CloseIcon';
import {
  CreateWalletModal,
  CreateContentTop,
  CreateContentBottom,
  CreateContent,
  CreateTitle,
  CreateInput,
  CreateLNWalletButton,
  ImportLNWalletLink,
} from './styles';
import { CloseContainer, Header } from '../styles';
import { TransitionablePortal } from 'semantic-ui-react';
import { useAppStore } from '../../../mobx';
import LoadingIcon from '../../Icons/Loading';
import RecoveryKey from './RecoveryKey';
import { useLNWallet } from '../../../hook/useLNWallet';
import { LNWalletStepStatus } from '../../../mobx/user';

const CreateWallet = observer(() => {
  const [walletName, setWalletName] = useState('');

  const {
    lightning: { nextWalletName },
    user: { setLNWalletStep },
  } = useAppStore();

  const [recoveryKey, setRecoveryKey] = useState('');

  const lnWallet = useLNWallet();

  useEffect(() => {
    const credential = lnWallet.wallet?.credential;
    if (!credential) return;
    const key = `lndhub://${credential.login}:${credential.password}@https://lndhub.io`;
    setRecoveryKey(key);
  }, [lnWallet.wallet]);

  async function onCreateLightning() {
    try {
      await lnWallet.create(walletName || nextWalletName);
    } catch (e) {
      console.error('create lightning error', e);
    }
  }

  function close() {
    setLNWalletStep(LNWalletStepStatus.Done);
  }

  return (
    <>
      {!recoveryKey ? (
        <TransitionablePortal
          open={true}
          transition={{ animation: 'fade up', duration: '300' }}>
          <CreateWalletModal open={true}>
            <Header>
              <LightningIcon />
              <p>add lightning wallet</p>
            </Header>
            <CloseContainer>
              <CloseIcon onClick={close} />
            </CloseContainer>

            <CreateContent>
              <CreateContentTop>
                <CreateTitle>wallet name</CreateTitle>
                <CreateInput
                  onInput={({
                    target,
                  }: React.ChangeEvent<HTMLInputElement>) => {
                    setWalletName(target.value);
                  }}
                  autoFocus
                  placeholder={nextWalletName}
                />
              </CreateContentTop>
              <CreateContentBottom>
                <CreateLNWalletButton
                  onClick={onCreateLightning}
                  disabled={lnWallet.createLoading}>
                  {lnWallet.createLoading ? (
                    <LoadingIcon spin />
                  ) : (
                    'create lightning wallet'
                  )}
                </CreateLNWalletButton>
                <ImportLNWalletLink>import lightning wallet</ImportLNWalletLink>
              </CreateContentBottom>
            </CreateContent>
          </CreateWalletModal>
        </TransitionablePortal>
      ) : (
        <RecoveryKey recoveryKey={recoveryKey} close={close} />
      )}
    </>
  );
});

export default CreateWallet;
