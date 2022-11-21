import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../mobx';
import { H3, Message, MessageType, Modal } from '../../kits';
import RecoveryKey from '../Lightning/CreateWallet/RecoveryKey';
import EditIcon from '../Icons/EditIcon';
import { WalletType } from '../../interface';
import { Button } from 'snapkit';
import { EditWalletContainer } from './styles';
import { List } from '../../kits/List';
import Divider from '../../kits/Divider';
import LightningWallet from '../../mobx/lightningWallet';
import { Instance, types } from 'mobx-state-tree';
import { getLNWalletData, GetLNWalletDataKey } from '../../lib/snap';

interface EditWalletProps {
  open: boolean;
  id: string | null;
  walletType: WalletType;
  close: () => void;
  showSelfModal: (args: { id: string; type: WalletType }) => void;
}

type LightningWallet = Instance<typeof LightningWallet>;

type WalletInfo = { name: string } & Partial<LightningWallet>;

const walletTypeTextMap = {
  [WalletType.BitcoinWallet]: 'Bitcoin On Chain Wallet',
  [WalletType.LightningWallet]: 'Lightning',
};

const EditWallet = observer(
  ({ open, id, walletType, close, showSelfModal }: EditWalletProps) => {
    const { lightning } = useAppStore();
    const parentNode = useRef<HTMLDivElement>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
      current,
      lightning: { getWalletByUserId, updateWallet: updateLightningWallet },
      user: { name: bitcoinWalletName, updateUser },
      switchToWallet,
    } = useAppStore();

    const [recoveryKey, setRecoveryKey] = useState({
      open: false,
      value: '',
    });

    const [backWalletInfo, setBackWalletInfo] = useState<WalletInfo>();
    const [walletInfo, setWalletInfo] = useState<WalletInfo>();

    useEffect(() => {
      if (!id) return;
      if (walletType === WalletType.LightningWallet) {
        setWalletInfo(getWalletByUserId(id));
        setBackWalletInfo(getWalletByUserId(id));
      } else {
        setWalletInfo({
          name: bitcoinWalletName,
        });
        setBackWalletInfo({
          name: bitcoinWalletName,
        });
      }
    }, [id]);

    const shouldEnableSaveButton = useMemo(() => {
      return JSON.stringify(walletInfo) === JSON.stringify(backWalletInfo);
    }, [walletInfo, backWalletInfo]);

    function onDeleteWallet() {
      if (!id) {
        console.error('id not found');
        return;
      }
      if (walletType === WalletType.LightningWallet) {
        lightning.removeWallet(id);
        switchToWallet(WalletType.BitcoinWallet, current?.xpub);
      }
      onCloseConfirm();
      close();
    }

    function onShowDeleteConfirm() {
      setShowConfirm(true);
    }

    function onCloseConfirm() {
      setShowConfirm(false);
    }

    function onChangeWalletName(name: string) {
      setWalletInfo({
        ...walletInfo,
        name,
      } as any);
    }

    async function onSave() {
      if (!id) {
        console.error('not found id');
        return;
      }
      if (!walletInfo?.name) {
        console.error('not found new wallet name');
        return;
      }

      if (walletType === WalletType.LightningWallet) {
        updateLightningWallet(id, {
          name: walletInfo.name,
        });
      } else {
        updateUser(walletInfo.name);
      }
      close();
    }

    async function onShowBackup() {
      try {
        if (!walletInfo?.userId) {
          throw new Error('not found user id');
        }
        const credentialString = await getLNWalletData(
          GetLNWalletDataKey.Credential,
          walletInfo.userId,
        );
        setRecoveryKey({
          open: true,
          value: `lndhub://${credentialString}@https://lndhub.io`,
        });
      } catch (e) {
        const msg = (e as Error)?.message;
        if (msg === 'User rejected the request.') {
          setErrorMessage(msg);
        } else {
          setErrorMessage('show recovery key error');
        }
      }
    }

    function onCloseRecoveryKeyModal() {
      setRecoveryKey({
        open: false,
        value: '',
      });
      if (!walletInfo?.userId) {
        console.error('not found wallet userId');
        return;
      }
      showSelfModal({
        id: walletInfo.userId,
        type: walletType,
      });
    }

    return open && !recoveryKey.open ? (
      <Modal
        style={{
          width: 440,
          height: 640,
          borderRadius: '20px',
          position: 'relative',
        }}
        close={close}
        open={open && !recoveryKey.open}
        key="editWalletModal"
        closeOnDimmerClick={false}>
        <EditWalletContainer ref={parentNode}>
          <Modal.Header
            left={
              <>
                <EditIcon style={{ color: 'var(--sk-color-pri50)' }} />
                <H3 style={{ marginLeft: 4 }}>Edit</H3>
              </>
            }></Modal.Header>
          <Modal.Container>
            <List>
              <List.Form
                title="Wallet Name"
                value={walletInfo?.name}
                onInput={(ev) => onChangeWalletName(ev.target.value)}
              />
              <List.Field
                title="Type"
                content={walletTypeTextMap[walletType]}
              />
              {walletType === WalletType.LightningWallet && (
                <>
                  <List.Field
                    title="Connected To"
                    content="https://lndhub.io"
                  />
                  {/* <List.Field title="Transactions Count" content="" /> */}
                  <Divider direction="horizontal" />
                  <List.Field
                    title="Backup Wallet"
                    onClick={onShowBackup}
                    hoverable
                    arrow
                  />
                  <List.Field
                    title={
                      <span style={{ color: 'var(--sk-color-r60)' }}>
                        Delete Wallet
                      </span>
                    }
                    hoverable
                    onClick={onShowDeleteConfirm}
                  />
                </>
              )}
            </List>
          </Modal.Container>
          <Modal.Footer>
            <Button onClick={close}>
              <H3>Cancel</H3>
            </Button>
            <Button onClick={onSave} primary disabled={shouldEnableSaveButton}>
              <H3>Save</H3>
            </Button>
          </Modal.Footer>
          <Modal.Confirm
            title="Delete Wallet"
            open={showConfirm}
            onClose={onCloseConfirm}
            onCancel={onCloseConfirm}
            onConfirm={onDeleteWallet}
            confirmText="Delete"
            parentNode={parentNode.current}>
            Are you sure you want to delete this wallet? Please make sure to
            backup your wallet before you delete it
          </Modal.Confirm>
        </EditWalletContainer>
        {errorMessage && (
          <Message type={MessageType.Error} onClose={() => setErrorMessage('')}>
            {errorMessage}
          </Message>
        )}
      </Modal>
    ) : (
      <RecoveryKey
        open={recoveryKey.open}
        recoveryKey={recoveryKey.value}
        close={onCloseRecoveryKeyModal}
        key="recoveryKeyModal"
        bottomAction={
          <Button primary onClick={onCloseRecoveryKeyModal}>
            Done
          </Button>
        }
      />
    );
  },
);

export default EditWallet;
