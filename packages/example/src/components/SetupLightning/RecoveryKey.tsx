import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import {
  RecoverKeyModal,
  Header,
  RecoveryContainer,
  RecoveryTop,
  RecoveryTitle,
  RecoveryKeyBox,
  RecoveryKeyMask,
  RecoveryKey,
  KeyBoxContainer,
  DownloadButton,
  RecoveryBottom,
  GoToWalletContainer,
  GoToWalletTip,
  SavedCheckbox,
  GoToWalletButton
} from "./styles"
import { ReactComponent as RecoveryKeyIcon } from "./image/recoveryKey.svg";
import { ReactComponent as EyeIcon } from "./image/eye.svg";
import { ReactComponent as Download } from "./image/download.svg";

interface CreateWalletProps {
  close: () => void;
}

const SetupLightning = observer(({close}: CreateWalletProps) => {
  const[isChecked, setIsChecked] = useState<boolean>(false)
  const downloadFile = () => {
    // TODO
  }

  return (
    <RecoverKeyModal open={true}>
      <RecoveryContainer>
        <Header>
          <RecoveryKeyIcon />
          <p>recovery key</p>
        </Header>

        <RecoveryTop>
          <RecoveryTitle>
            This secret key is the <span>only way</span> to recover your lightning wallet. Please save it somewhere safe.
          </RecoveryTitle>

          <RecoveryKeyBox>
            <RecoveryKeyMask>
              <EyeIcon /><span>Hover here to view the recovery key</span>
            </RecoveryKeyMask>
            <RecoveryKey>
              {/* TODO */}
            </RecoveryKey>
          </RecoveryKeyBox>

          <KeyBoxContainer>
            <DownloadButton icon={<Download />} onClick={downloadFile} >
              <span>download key file</span>
            </DownloadButton>
          </KeyBoxContainer>
        </RecoveryTop>
      </RecoveryContainer>

      <RecoveryBottom>
        <GoToWalletContainer>
          <SavedCheckbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
          <GoToWalletTip>I‘ve saved it somewhere safe</GoToWalletTip>
        </GoToWalletContainer>
        <GoToWalletButton onClick={close} disabled={!isChecked}>go to my wallet</GoToWalletButton>
      </RecoveryBottom>
    </RecoverKeyModal>
  )
})

export default SetupLightning;
