import React, { useEffect, useRef, useState } from 'react'
import { TransitionablePortal } from "semantic-ui-react";
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
import { BitcoinNetwork, WalletType } from "../../interface";
import { AddLightningWallet } from "./AddLightningWallet";
import { createLightningWallet } from "../../services/LightningService/createLightningWallet";
import { Popup } from "../../kits/Popup";

export const WalletList = observer(({open, close}: any) => {
  const {current, lightning, user: {bitcoinUnit}, switchToWallet, settings: {network}, currentWalletType} = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const [selectedWallet, setSelectedWallet] = useState<string>(() => {
    if(lightning.hasLightningWallet){
      return (currentWalletType === WalletType.BitcoinWallet ? current?.id : lightning.current?.id) || '';
    }
    return '';
  });
  const parentNode = useRef<any>();
  const shouldDisableAddition = network === BitcoinNetwork.Test || lightning.hasReachedLimitation;

  useEffect(() => {
    setVisible(open)
  }, [open])

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
                        ? 'You can only add up to a maximum of 10 Lightning Wallets at any one time'
                        : 'Add a Lightning Wallet'
                  }
                  trigger={
                    <span>
                      <AddIcon
                        onClick={() => {
                          const userId = 'user-id' + Math.random()
                          createLightningWallet(userId)
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
                    createLightningWallet(userId)
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
