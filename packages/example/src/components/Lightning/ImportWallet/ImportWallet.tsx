import React from 'react';
import {
  Button,
  ImportWalletContainer,
  ImportWalletHeader,
  ImportWalletModal,
  ImportWalletTips,
  KeyInput,
  KeyInputContainer,
  KeyLabel,
  Uploader,
  UploaderContainer
} from "./styles";
import InfoIcon from "../../Icons/InfoIcon";
import { ReactComponent as UploadIcon } from './image/upload.svg';
import { Message, MessageType, Popup } from "../../../kits";
import { useAppStore } from "../../../mobx";
import LoadingIcon from "../../Icons/Loading";
import { LightningImportWalletModel } from "./model";
import { observer } from "mobx-react-lite";
import { ImportWalletProps } from "./index";

export const ImportWallet = observer(({close, parent, onSucceed, model}: ImportWalletProps & { model: LightningImportWalletModel}) => {
  const {lightning} = useAppStore();

  return (
    <ImportWalletModal close={close} mountNode={parent}>
      <ImportWalletContainer>
        <ImportWalletHeader>
          Import Lightning Wallet
        </ImportWalletHeader>
        <KeyLabel htmlFor='credential'>Lightning Wallet Key</KeyLabel>
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
        <ImportWalletTips>
          <InfoIcon color="#1F69FF"/>
          <span>Compatible with keys created by BlueWallet</span>
        </ImportWalletTips>
        <Button
          disabled={!model.isReadyToImport}
          onClick={() => {
            model.importLightningWallet().then(newWallet => {
              lightning.applyWallet(newWallet);
              onSucceed();
            })
          }}
        >
          {model.isImporting ? <LoadingIcon spin/> : 'Import'}
        </Button>
        {
          model.isImportFailed &&
            <Message type={MessageType.Error}>Import Failed. Please Try Again Later</Message>
        }
      </ImportWalletContainer>
    </ImportWalletModal>
  )
});
