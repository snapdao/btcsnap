import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ActionButton,
  Bottom,
  Box,
  BoxContainer,
  Container,
  GoToWalletButton,
  GoToWalletContainer,
  GoToWalletTip,
  Mask, RecoverKeyContainer,
  SavedCheckbox,
  Text,
  Title,
  Top,
} from './styles';
import { ReactComponent as KeyIcon } from '../image/recoveryKey.svg';
import { ReactComponent as EyeIcon } from '../image/eye.svg';
import { ReactComponent as Download } from '../image/download.svg';
import { ReactComponent as Copy } from '../image/copy.svg';
import saveData from '../../../../utils/save';
import { useAppStore } from '../../../../mobx';
import { Header } from '../styles';
import { WalletType } from '../../../../interface';
import { copyToClipboard } from '../../../../utils/clipboard';
import { Message, MessageType, Modal } from '../../../../kits';

interface CreateWalletProps {
  close: () => void;
  recoveryKey: string;
}

const RecoveryKey = observer(({ close, recoveryKey }: CreateWalletProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [copyToClipboardStatus, setCopyToClipboardStatus] =
    useState<boolean>(false);

  const {
    lightning: { current },
    currentWalletType,
    switchWalletType,
  } = useAppStore();

  async function copyKey() {
    if (!recoveryKey || !current?.name) return;
    const copyStatus = await copyToClipboard({ text: recoveryKey });
    if (copyStatus) {
      setCopyToClipboardStatus(true);
      setTimeout(() => {
        setCopyToClipboardStatus(false);
      }, 1500);
    }
  }
  function downloadFile() {
    if (!recoveryKey || !current?.name) return;
    saveData(recoveryKey, current.name + ' backup.txt');
  }

  function onGoToMyWallet() {
    if (currentWalletType !== WalletType.LightningWallet) {
      switchWalletType(WalletType.LightningWallet);
    }
    close();
  }

  return (
    <Modal>
      <RecoverKeyContainer>
        <Container>
          <Header>
            <KeyIcon />
            <p>recovery key</p>
          </Header>

          <Top>
            <Title>
              This secret key is the <span>only way</span> to recover your
              lightning wallet. Please save it somewhere safe.
            </Title>

            <Box>
              <Mask>
                <EyeIcon />
                <span>Hover your cursor over here to view the key</span>
              </Mask>
              <Text>{recoveryKey}</Text>
            </Box>

            <BoxContainer>
              <ActionButton icon={<Copy />} onClick={copyKey}>
                <span>Copy to Clipboard</span>
              </ActionButton>
              <ActionButton icon={<Download />} onClick={downloadFile}>
                <span>download key file</span>
              </ActionButton>
            </BoxContainer>
          </Top>
        </Container>

        {copyToClipboardStatus && (
          <Message type={MessageType.Succeed}>Copied to clipboard</Message>
        )}

        <Bottom>
          <GoToWalletContainer>
            <SavedCheckbox
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
            />
            <GoToWalletTip>I‘ve saved it somewhere safe</GoToWalletTip>
          </GoToWalletContainer>
          <GoToWalletButton onClick={onGoToMyWallet} disabled={!isChecked}>
            go to my wallet
          </GoToWalletButton>
        </Bottom>
      </RecoverKeyContainer>
    </Modal>
  );
});

export default RecoveryKey;
