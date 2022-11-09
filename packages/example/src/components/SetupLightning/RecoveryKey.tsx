import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
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
  GoToWalletButton,
} from './styles';
import { ReactComponent as RecoveryKeyIcon } from './image/recoveryKey.svg';
import { ReactComponent as EyeIcon } from './image/eye.svg';
import { ReactComponent as Download } from './image/download.svg';
import { TransitionablePortal } from 'semantic-ui-react';
import saveData from '../../utils/save';
import { useAppStore } from '../../mobx';

interface CreateWalletProps {
  recoveryKey: string;
  close: () => void;
}

const SetupLightning = observer(({ recoveryKey, close }: CreateWalletProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    lightning: { current },
  } = useAppStore();

  const downloadFile = () => {
    if (!recoveryKey || !current?.name) return;
    saveData(recoveryKey, current.name + ' backup.txt');
  };

  return (
    <TransitionablePortal
      open={true}
      transition={{ animation: 'fade left', duration: '300' }}>
      <RecoverKeyModal open={true}>
        <RecoveryContainer>
          <Header>
            <RecoveryKeyIcon />
            <p>recovery key</p>
          </Header>

          <RecoveryTop>
            <RecoveryTitle>
              This secret key is the <span>only way</span> to recover your
              lightning wallet. Please save it somewhere safe.
            </RecoveryTitle>

            <RecoveryKeyBox>
              <RecoveryKeyMask>
                <EyeIcon />
                <span>Hover your cursor over here to view the key</span>
              </RecoveryKeyMask>
              <RecoveryKey>{recoveryKey}</RecoveryKey>
            </RecoveryKeyBox>

            <KeyBoxContainer>
              <DownloadButton icon={<Download />} onClick={downloadFile}>
                <span>download key file</span>
              </DownloadButton>
            </KeyBoxContainer>
          </RecoveryTop>
        </RecoveryContainer>

        <RecoveryBottom>
          <GoToWalletContainer>
            <SavedCheckbox
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
            />
            <GoToWalletTip>I‘ve saved it somewhere safe</GoToWalletTip>
          </GoToWalletContainer>
          <GoToWalletButton onClick={close} disabled={!isChecked}>
            go to my wallet
          </GoToWalletButton>
        </RecoveryBottom>
      </RecoverKeyModal>
    </TransitionablePortal>
  );
});

export default SetupLightning;
