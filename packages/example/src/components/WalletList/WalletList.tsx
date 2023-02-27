import { useEffect, useMemo, useRef, useState } from 'react';
import { TransitionablePortal } from 'semantic-ui-react';
import { WalletCard } from './WalletCard';
import { useAppStore } from '../../mobx';
import {
  AccountPageShadow, AddLnWalletContainer,
  CurrentPage,
  WalletListContainer,
  WalletListContent,
  WalletListContentContainer,
  WalletListHeader,
  WalletListModal,
} from './styles';
import { observer } from 'mobx-react-lite';
import { BitcoinNetwork, BitcoinUnit, WalletType } from '../../interface';
import { AddLightningWallet } from './AddLightningWallet';
import { Popup } from '../../kits';
import CreateWallet from '../Lightning/CreateWallet';
import EditWallet from '../EditWallet';
import { useWalletsBalance } from '../../hook/useWalletsBalance';
import { bitcoinUnitMap } from '../../lib/unit';

export const WalletList = observer(({ open, close }: any) => {
  const {
    current,
    lightning,
    user: { bitcoinWalletName, bitcoinUnit },
    switchToWallet,
    settings: { network },
    currentWalletType,
    runtime: { getWalletBalance }
  } = useAppStore();
  useWalletsBalance();

  const [visible, setVisible] = useState<boolean>(open);
  const [shouldShowCreateWallet, setShouldShowCreateWallet] =
    useState<boolean>(false);
  const [currentEditWallet, setCurrentEditWallet] = useState<{
    open: boolean;
    id: string | null;
    type: WalletType;
  }>({
    open: false,
    id: null,
    type: WalletType.LightningWallet,
  });

  const selectedWallet = useMemo(() => {
    if (lightning.hasLightningWallet) {
      return (
        (currentWalletType === WalletType.BitcoinWallet
          ? current?.id
          : lightning.current?.id) || ''
      );
    }
    return current?.id;
  }, [
    current?.id,
    lightning.current?.id,
    lightning.hasLightningWallet,
    currentWalletType,
  ]);

  const parentNode = useRef<any>();
  const shouldDisableAddition =
    network === BitcoinNetwork.Test || lightning.hasReachedLimitation || true;

  const unitText = bitcoinUnitMap[network][bitcoinUnit];

  useEffect(() => {
    setVisible(open);
  }, [open]);

  function showCreateWallet() {
    setShouldShowCreateWallet(true);
  }

  function onCloseEditWalletModal() {
    setCurrentEditWallet({
      ...currentEditWallet,
      id: null,
      open: false,
    });
  }

  function onShowEditWalletModal(walletData: { id: string; type: WalletType }) {
    setCurrentEditWallet({
      ...currentEditWallet,
      ...walletData,
      open: true,
    });
  }

  return (
    <CurrentPage open={open}>
      <AccountPageShadow ref={parentNode} open={open}>
        <TransitionablePortal
          open={visible}
          transition={{ animation: 'fade left', duration: 250 }}
          closeOnDocumentClick={false}>
          <WalletListModal
            open={open}
            onClose={() => {
              setVisible(false);
              setTimeout(() => close(), 250);
            }}
            mountNode={parentNode.current}>
            <WalletListContainer>
              <WalletListHeader>
                <span>wallets</span>
                {/* TODO: Multiple Account Bitcoin Wallet */}
                {/* <Popup
                  position="top center"
                  content={
                    network === BitcoinNetwork.Test
                      ? 'Not available on Testnet'
                      : lightning.hasReachedLimitation
                      ? 'You can only add up to a maximum of 10 Lightning Wallets at any one time'
                      : 'Add a Lightning Wallet'
                  }
                  trigger={
                    <span>
                      <AddIcon
                        onClick={showCreateWallet}
                        disabled={shouldDisableAddition}
                      />
                    </span>
                  }
                /> */}
              </WalletListHeader>

              <WalletListContentContainer>
                <WalletListContent>
                  <WalletCard
                    id={current?.id || ''}
                    name={bitcoinWalletName}
                    key={current?.id}
                    walletType={WalletType.BitcoinWallet}
                    balance={getWalletBalance(current?.id || '')}
                    selected={lightning.hasLightningWallet && selectedWallet === current?.id}
                    onClick={() => {
                      if (current) {
                        switchToWallet(WalletType.BitcoinWallet, current.xpub);
                      }
                    }}
                    showEditWalletModal={onShowEditWalletModal}
                    unit={unitText as BitcoinUnit}
                  />
                  {lightning.wallets.map((wallet) => (
                    <WalletCard
                      key={wallet.id}
                      id={wallet.userId}
                      walletType={WalletType.LightningWallet}
                      name={wallet.name}
                      balance={getWalletBalance(wallet.id)}
                      selected={selectedWallet === wallet.id}
                      onClick={() => {
                        if (network === BitcoinNetwork.Main) {
                          switchToWallet(
                            WalletType.LightningWallet,
                            wallet.userId,
                          );
                        }
                      }}
                      showEditWalletModal={onShowEditWalletModal}
                      unit={wallet.unit}
                      available={network === BitcoinNetwork.Main}
                    />
                  ))}

                  <AddLnWalletContainer>
                    <Popup
                      position='top center'
                      content={
                        lightning.hasReachedLimitation
                          ? 'You can only add up to a maximum of 10 Lightning Wallets at any one time'
                          : 'Unable to create lightning wallet while lightning wallet service is under maintenance'
                      }
                      disabled={!shouldDisableAddition}
                      trigger={
                        network === BitcoinNetwork.Main && (
                          <div>
                            <AddLightningWallet
                              onAddWallet={showCreateWallet}
                              disabled={shouldDisableAddition}
                            />
                          </div>
                        )
                      }
                    />
                  </AddLnWalletContainer>
                </WalletListContent>
              </WalletListContentContainer>
            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>

        <CreateWallet
          open={shouldShowCreateWallet}
          close={() => {
            setShouldShowCreateWallet(false);
          }}
        />

        <EditWallet
          open={currentEditWallet.open}
          id={currentEditWallet.id}
          walletType={currentEditWallet.type}
          close={onCloseEditWalletModal}
          showSelfModal={onShowEditWalletModal}
        />
      </AccountPageShadow>
    </CurrentPage>
  );
});
