import React from 'react';
import {
  Button,
  ImportWalletContainer,
  ImportWalletHeader,
  ImportWalletModal,
  ImportWalletErrorTip,
  KeyInput,
  KeyInputContainer,
  Label,
  Uploader,
  UploaderContainer, WalletKeyContainer, WalletNameContainer, WalletNameInput, KeyLabelContainer
} from "./styles";
import InfoIcon from "../../Icons/InfoIcon";
import { ReactComponent as UploadIcon } from './image/upload.svg';
import { Message, MessageType, Popup } from "../../../kits";
import { useAppStore } from "../../../mobx";
import LoadingIcon from "../../Icons/Loading";
import { LightningImportWalletModel } from "./model";
import { observer } from "mobx-react-lite";
import { ImportWalletProps } from "./index";
import { WalletType } from "../../../interface";

interface Props extends ImportWalletProps {
  model: LightningImportWalletModel
}

export const ImportWallet = observer(({close, parent, onSucceed, model}: Props) => {
  const {lightning, switchWalletType} = useAppStore();

  return (
    <ImportWalletModal close={close} mountNode={parent}>
      <ImportWalletContainer>
        <ImportWalletHeader>
          Import Lightning Wallet
        </ImportWalletHeader>
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
              content={'Also compatible with keys created by LNDHub, only .txt files are supported'}
              trigger={<div><InfoIcon /></div>}
              wide
            />
          </KeyLabelContainer>
          <KeyInputContainer>
            <KeyInput
              id='credential'
              placeholder={'Enter or paste the Lightning wallet key here'}
              onChange={model.onCredentialInputChanged}
              value={model.credential}
            />
            <Popup
              content={'Upload Lightning Wallet Key File'}
              trigger={(
                <UploaderContainer>
                  <label htmlFor="credential-input">
                    <UploadIcon/>
                  </label>
                  <Uploader
                    type={'file'}
                    accept={'.txt'}
                    id={'credential-input'}
                    onChange={model.onCredentialFileChanged}
                  />
                </UploaderContainer>
              )}
            >
            </Popup>
          </KeyInputContainer>
        </WalletKeyContainer>
        <ImportWalletErrorTip>
          {model.errorTip}
        </ImportWalletErrorTip>
        <Button
          primary
          disabled={!model.isReadyToImport}
          onClick={() => {
            model.importLightningWallet().then(newWallet => {
              lightning.applyWallet(newWallet);
              switchWalletType(WalletType.LightningWallet);
              onSucceed();
            })
          }}
        >
          {model.isImporting ? <LoadingIcon spin/> : 'Import'}
        </Button>
        {
          model.isImportSucceed &&
            <Message type={MessageType.Succeed}>Import Successfully</Message>
        }
        {
          model.isImportFailed &&
            <Message type={MessageType.Error}>Import Failed. Please Try Again Later</Message>
        }
      </ImportWalletContainer>
    </ImportWalletModal>
  )
});
