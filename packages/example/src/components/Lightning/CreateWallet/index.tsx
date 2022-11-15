import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as LightningIcon } from './image/lightning.svg';
import {
  CreateContentTop,
  CreateContentBottom,
  CreateContent,
  CreateTitle,
  CreateInput,
  CreateLNWalletButton,
  ImportLNWalletLink, ContentContainer,
} from './styles';
import { Header } from '../styles';
import { useAppStore } from '../../../mobx';
import LoadingIcon from '../../Icons/Loading';
import RecoveryKey from './RecoveryKey';
import { useLNWallet } from '../../../hook/useLNWallet';
import { ImportWallet } from "../ImportWallet";
import { Modal } from "../../../kits";

const CreateWallet = observer(({close}: {close: () => void}) => {
  const [walletName, setWalletName] = useState('');
  const [showImport, setShowImport] = useState<boolean>(false);
  const parentNode = useRef<HTMLDivElement>(null);

  const {
    lightning: { nextWalletName },
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

  return (
    <>
      {!recoveryKey ? (
        <Modal onClose={close}>
          <ContentContainer ref={parentNode}>
            <Header>
              <LightningIcon />
              <p>add lightning wallet</p>
            </Header>

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
                <ImportLNWalletLink
                  onClick={() => { setShowImport(true)}}
                >
                  import lightning wallet
                </ImportLNWalletLink>
              </CreateContentBottom>
            </CreateContent>

            {
              showImport &&
                <ImportWallet
                  close={() => { setShowImport(false)}}
                  onSucceed={close}
                  parent={parentNode.current!}
                />
            }
          </ContentContainer>
        </Modal>
      ) : (
        <RecoveryKey recoveryKey={recoveryKey} close={close} />
      )}
    </>
  );
});

export default CreateWallet;
