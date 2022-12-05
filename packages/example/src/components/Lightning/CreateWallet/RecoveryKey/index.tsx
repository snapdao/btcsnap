import React, { Key, ReactNode, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ActionButton,
  Bottom,
  Box,
  BoxContainer,
  GoToWalletButton,
  GoToWalletContainer,
  GoToWalletTip,
  Mask,
  RecoverKeyContainer,
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
import { WalletType } from '../../../../interface';
import { copyToClipboard } from '../../../../utils/clipboard';
import { H3, Message, MessageType, Modal } from '../../../../kits';
import { trackLightningBackupWallet } from '../../../../tracking';

interface CreateWalletProps {
  open: boolean;
  recoveryKey: string;
  close: () => void;
  bottomAction?: ReactNode;
  key?: Key;
  showCloseIcon?: boolean;
  entryPage: 'create' | 'settings'
}

const RecoveryKey = observer(
  ({
    open,
    recoveryKey,
    bottomAction,
    key,
    showCloseIcon = true,
    close,
    entryPage
  }: CreateWalletProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [copyToClipboardStatus, setCopyToClipboardStatus] =
      useState<boolean>(false);
    const modalRef = useRef<any>(null);

    const {
      lightning: { current },
      currentWalletType,
      switchWalletType,
    } = useAppStore();

    async function copyKey() {
      if (!recoveryKey || !current?.name) return;
      const copyStatus = await copyToClipboard(recoveryKey);
      if (copyStatus) {
        trackLightningBackupWallet({
          entry: entryPage,
          action: 'copy'
        });
        setCopyToClipboardStatus(true);
        setTimeout(() => {
          setCopyToClipboardStatus(false);
        }, 1500);
      }
    }
    function downloadFile() {
      if (!recoveryKey || !current?.name) return;
      trackLightningBackupWallet({
        entry: entryPage,
        action: 'download'
      });
      saveData(recoveryKey, current.name + ' backup.txt');
    }

    function onGoToMyWallet() {
      if (currentWalletType !== WalletType.LightningWallet) {
        switchWalletType(WalletType.LightningWallet);
      }
      modalRef.current?.onClose();
    }

    return (
      <Modal ref={modalRef} open={open} close={close} key={key}>
        <RecoverKeyContainer>
          <Modal.Background>
            <Modal.Header
              left={
                <>
                  <KeyIcon />
                  <H3 style={{ marginLeft: 4 }}>recovery key</H3>
                </>
              }
              onClose={() => modalRef.current?.onClose()}
              showCloseIcon={showCloseIcon}></Modal.Header>
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
          </Modal.Background>

          {copyToClipboardStatus && (
            <Message type={MessageType.Succeed}>Copied to clipboard</Message>
          )}

          <Bottom>
            {!bottomAction ? (
              <>
                <GoToWalletContainer>
                  <SavedCheckbox
                    checked={isChecked}
                    onClick={() => setIsChecked(!isChecked)}
                  />
                  <GoToWalletTip>I‘ve saved it somewhere safe</GoToWalletTip>
                </GoToWalletContainer>
                <GoToWalletButton
                  onClick={onGoToMyWallet}
                  disabled={!isChecked}>
                  go to my wallet
                </GoToWalletButton>
              </>
            ) : (
              bottomAction
            )}
          </Bottom>
        </RecoverKeyContainer>
      </Modal>
    );
  },
);

export default RecoveryKey;
