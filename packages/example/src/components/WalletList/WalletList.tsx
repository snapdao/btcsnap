import React, { useEffect, useRef, useState } from 'react'
import { Popup, TransitionablePortal } from "semantic-ui-react";
import { WalletCard } from "./WalletCard";
import { useAppStore } from "../../mobx";
import { AddIcon } from "../Icons/AddIcon";
import {
  AccountPageShadow,
  CurrentPage,
  WalletListContainer,
  WalletListContent,
  WalletListContentContainer,
  WalletListHeader,
  WalletListModal
} from "./styles";
import { observer } from "mobx-react-lite";
import { BitcoinNetwork, BitcoinUnit, WalletType } from "../../interface";
import { AddLightningWallet } from "./AddLightningWallet";
import { generateLightningWalletId } from "../../mobx/utils";

export const WalletList = observer(({open, close}: any) => {
  const {current, lightning, user: {bitcoinUnit}, switchToWallet, settings: {network}} = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const parentNode = useRef<any>();
  const shouldDisableAddition = network === BitcoinNetwork.Test || lightning.hasReachedLimitation;

  useEffect(() => {
    setVisible(open)
  }, [open])

  const addLightningWallet = (userId: string, name = '') => {
    const newWallet = lightning.createWallet({
      id: generateLightningWalletId(),
      userId,
      name: name || lightning.nextWalletName,
      unit: BitcoinUnit.Sats
    })
    lightning.applyWallet(newWallet)
  }

  return (
    <CurrentPage open={open}>
      <AccountPageShadow ref={parentNode} open={open}>
        <TransitionablePortal
          open={visible}
          transition={{animation: 'fade left', duration: 250}}
          closeOnDocumentClick={false}
        >
          <WalletListModal
            open={open}
            onClose={() => {
              setVisible(false)
              setTimeout(() => close(), 250)
            }}
            mountNode={parentNode.current}
          >
            <WalletListContainer>
              <WalletListHeader>
                <span>wallets</span>
                <Popup
                  position='top center'
                  content={
                    network === BitcoinNetwork.Test ?
                      'Not available on Testnet'
                      : lightning.hasReachedLimitation
                        ? 'Wallet Reaches Limitation'
                        : 'Add a Lightning Wallet'
                  }
                  inverted
                  trigger={
                    <span>
                      <AddIcon
                        onClick={() => {
                          const userId = 'user-id' + Math.random()
                          addLightningWallet(userId)
                        }}
                        disabled={shouldDisableAddition}
                      />
                    </span>
                  }
                />
              </WalletListHeader>

              <WalletListContentContainer>
                <WalletListContent>
                  <WalletCard
                    id={current?.id || ''}
                    name={'Bitcoin'}
                    key={current?.id}
                    walletType={WalletType.BitcoinWallet}
                    balance={0.0001}
                    selected={selectedWallet === current?.id}
                    onClick={() => {
                      if (current) {
                        setSelectedWallet(current.id);
                        switchToWallet(WalletType.BitcoinWallet, current.xpub);
                      }
                    }}
                    unit={bitcoinUnit}
                  />
                  {
                    lightning.wallets.map(wallet => (
                      <WalletCard
                        key={wallet.id}
                        id={wallet.userId}
                        walletType={WalletType.LightningWallet}
                        name={wallet.name}
                        balance={10000}
                        selected={selectedWallet === wallet.id}
                        onClick={() => {
                          if (network === BitcoinNetwork.Main) {
                            setSelectedWallet(wallet.id);
                            switchToWallet(WalletType.LightningWallet, wallet.userId);
                          }
                        }}
                        unit={wallet.unit}
                        available={network === BitcoinNetwork.Main}
                      />
                    ))
                  }
                  <AddLightningWallet onAddWallet={() => {
                    const userId = 'user-id' + Math.random()
                    addLightningWallet(userId)
                  }}/>
                </WalletListContent>
              </WalletListContentContainer>

            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>
      </AccountPageShadow>
    </CurrentPage>
  )
})
