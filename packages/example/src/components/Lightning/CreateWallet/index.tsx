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
  ImportLNWalletLink,
  ContentContainer,
} from './styles';
import { useAppStore } from '../../../mobx';
import RecoveryKey from './RecoveryKey';
import { useLNWallet } from '../../../hook/useLNWallet';
import { ImportWallet } from '../ImportWallet';
import { H3, Message, MessageType, Modal } from '../../../kits';

const CreateWallet = observer(
  ({ open, close }: { open: boolean; close: () => void }) => {
    const [walletName, setWalletName] = useState('');
    const [showImport, setShowImport] = useState<boolean>(false);
    const parentNode = useRef<HTMLDivElement>(null);
    const [errorMessage, setErrorMessage] = useState('');

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
      setShowImport(false);
      return () => {
        setRecoveryKey('');
      };
    }, [lnWallet.wallet]);

    async function onCreateLightning() {
      try {
        await lnWallet.create(walletName || nextWalletName);
      } catch (e: any) {
        console.error('create lightning error', e);
        setErrorMessage('Create lightning wallet failed');
      }
    }

    function onCloseRecoveryKeyModal() {
      close();
      setTimeout(() => setRecoveryKey(''), 200);
    }

    return (
      <>
        {!recoveryKey ? (
          <Modal open={open} close={close}>
            <ContentContainer ref={parentNode}>
              <Modal.Header
                left={
                  <>
                    <LightningIcon />
                    <H3>ADD LIGHTNING WALLET</H3>
                  </>
                }
                onClose={close}></Modal.Header>

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
                    primary
                    onClick={onCreateLightning}
                    disabled={lnWallet.createLoading}>
                    create lightning wallet
                  </CreateLNWalletButton>
                  <ImportLNWalletLink
                    onClick={() => {
                      setShowImport(true);
                    }}>
                    import lightning wallet
                  </ImportLNWalletLink>
                </CreateContentBottom>
              </CreateContent>

              {errorMessage && (
                <Message
                  type={MessageType.Error}
                  onClose={() => setErrorMessage('')}>
                  {errorMessage}
                </Message>
              )}

              {lnWallet.createLoading && <Modal.Loading />}

              <ImportWallet
                open={showImport}
                close={() => {
                  setShowImport(false);
                }}
                onSucceed={() => {
                  setShowImport(false);
                  close();
                }}
                parent={parentNode.current!}
              />
            </ContentContainer>
          </Modal>
        ) : (
          <RecoveryKey
            open={!!recoveryKey}
            recoveryKey={recoveryKey}
            close={onCloseRecoveryKeyModal}
            showCloseIcon={false}
            entryPage='create'
          />
        )}
      </>
    );
  },
);

export default CreateWallet;
