import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLNWallet } from '../../hook/useLNWallet';
import { LightningContext } from './ctx';
import RecoveryKey from './RecoveryKey';
import CreateWallet from './CreateWallet';
import Ready from './Ready';
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from '../../mobx/user';

interface UserOperations {
  createWallet: () => void;
}

const SetupLightning = observer(({ createWallet }: UserOperations) => {
  const {
    user: { LNWalletStep, setLNWalletStep },
  } = useAppStore();

  const lnWallet = useLNWallet();

  useEffect(() => {
    const credential = lnWallet.wallet?.credential;
    if (!credential) return;
    const key = `lndhub://${credential.login}:${credential.password}@https://lndhub.io`;
    update({
      ...state,
      setupStep: 'recoveryKey',
      recoveryKey: key,
    });
  }, [lnWallet.wallet]);

  const onCreateLightning = async (name: string) => {
    try {
      await lnWallet.create(name);
    } catch (e) {
      console.error('create lightning error', e);
    }
  };

  const { state, update } = useContext(LightningContext);

  const onCloseSetupModal = () => {
    setLNWalletStep(LNWalletStepStatus.Done);
    update({
      ...state,
      setupStep: null,
      recoveryKey: null,
    });
  };

  return (
    <>
      {LNWalletStep === LNWalletStepStatus.CreateWallet && !state.setupStep && (
        <Ready />
      )}

      {state.setupStep === 'createWallet' && (
        <CreateWallet
          create={onCreateLightning}
          loading={lnWallet.createLoading}
          close={onCloseSetupModal}
        />
      )}

      {state.setupStep === 'recoveryKey' && (
        <RecoveryKey close={onCloseSetupModal} />
      )}
    </>
  );
});

export default SetupLightning;
