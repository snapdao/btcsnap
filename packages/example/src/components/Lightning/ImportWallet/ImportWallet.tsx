import React from 'react';
import {
  Button,
  ImportWalletContainer,
  ImportWalletModal,
  ImportWalletErrorTip,
  KeyInput,
  KeyInputContainer,
  Label,
  Uploader,
  UploaderContainer,
  WalletKeyContainer,
  WalletNameContainer,
  WalletNameInput,
  KeyLabelContainer,
} from './styles';
import InfoIcon from '../../Icons/InfoIcon';
import { ReactComponent as UploadIcon } from './image/upload.svg';
import { H3, Message, MessageType, Modal, Popup } from '../../../kits';
import { useAppStore } from '../../../mobx';
import LoadingIcon from '../../Icons/Loading';
import { LightningImportWalletModel } from './model';
import { observer } from 'mobx-react-lite';
import { ImportWalletProps } from './index';
import { WalletType } from '../../../interface';
import { ILightningWallet } from '../../../mobx/types';

interface Props extends ImportWalletProps {
  model: LightningImportWalletModel;
}

export const ImportWallet = observer(
  ({ open, close, parent, onSucceed, model }: Props) => {
    const { lightning, switchWalletType } = useAppStore();
    const applyWallet = (newWallet: ILightningWallet) => {
      lightning.applyWallet(newWallet);
      switchWalletType(WalletType.LightningWallet);
      onSucceed();
    };

    return (
      <ImportWalletModal open={open} close={close} mountNode={parent}>
        <Modal.Header onClose={() => {
          close();
          model.resetState();
        }}>
          <H3>Import Lightning Wallet</H3>
        </Modal.Header>
        <ImportWalletContainer>
          <WalletNameContainer>
            <Label htmlFor='walletName'>Wallet Name</Label>
            <WalletNameInput
              id={'walletName'}
              onChange={model.onWalletNameChanged}
              placeholder={lightning.nextWalletName}
            />
          </WalletNameContainer>
          <WalletKeyContainer>
            <KeyLabelContainer>
              <Label htmlFor='credential'>Lightning Wallet Key</Label>
              <Popup
                content={
                  'Also compatible with keys created by LNDHub, only .txt files are supported'
                }
                trigger={
                  <div>
                    <InfoIcon />
                  </div>
                }
                wide
              />
            </KeyLabelContainer>
            <KeyInputContainer>
              <KeyInput
                autoFocus
                id='credential'
                placeholder={'Enter or paste the Lightning wallet key here'}
                onChange={model.onCredentialInputChanged}
                value={model.credential}
              />
              <Popup
                content={'Upload Lightning Wallet Key File'}
                trigger={
                  <UploaderContainer>
                    <label htmlFor='credential-input'>
                      <UploadIcon/>
                    </label>
                    <Uploader
                      type={'file'}
                      accept={'.txt'}
                      id={'credential-input'}
                      onChange={model.onCredentialFileChanged}
                    />
                  </UploaderContainer>
                }/>
            </KeyInputContainer>
          </WalletKeyContainer>
          <ImportWalletErrorTip>{model.errorTip}</ImportWalletErrorTip>
          <Button
            primary
            disabled={!model.isReadyToImport}
            onClick={() => model.importLightningWallet(applyWallet)}>
            {model.isImporting ? <LoadingIcon spin /> : 'Import'}
          </Button>
          {model.isImportSucceed && (
            <Message type={MessageType.Succeed}>Import Successfully</Message>
          )}
          {model.isImportFailed && (
            <Message type={MessageType.Error}>
              Import Failed. Please Try Again Later
            </Message>
          )}
        </ImportWalletContainer>
      </ImportWalletModal>
    );
  },
);
