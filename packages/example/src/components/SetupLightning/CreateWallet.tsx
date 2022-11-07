import React from 'react';
import { observer } from "mobx-react-lite";
import { ReactComponent as LightningIcon } from "./image/lightning.svg"
import CloseIcon from "../Icons/CloseIcon";
import {
  CreateWalletModal,
  Header,
  CloseContainer,
  CreateContentTop,
  CreateContentBottom,
  CreateContent,
  CreateTitle,
  CreateInput,
  CreateLNWalletButton,
  ImportLNWalletLink
} from "./styles"

interface CreateWalletProps {
  close: () => void;
}

const SetupLightning = observer(({close}: CreateWalletProps) => {

  return (
    <CreateWalletModal open={true}>
      <Header>
        <LightningIcon />
        <p>add lightning wallet</p>
      </Header>
      <CloseContainer><CloseIcon onClick={close} /></CloseContainer>

      <CreateContent>
        <CreateContentTop>
          <CreateTitle>wallet name</CreateTitle>
          <CreateInput
            autoFocus
            placeholder="Lightning"
          />
        </CreateContentTop>
        <CreateContentBottom>
          <CreateLNWalletButton onClick={close}>create lightning wallet</CreateLNWalletButton>
          <ImportLNWalletLink>import lightning wallet</ImportLNWalletLink>
        </CreateContentBottom>
      </CreateContent>
    </CreateWalletModal>
  )
})

export default SetupLightning;
