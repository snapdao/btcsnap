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
import { BitcoinUnit, WalletType } from "../../interface";
import { AddLightningWallet } from "./AddLightningWallet";

export const WalletList = observer(({open, close}: any) => {
  const {current, lightning, user: {bitcoinUnit}, switchToWallet} = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const [selectedWallet, setSelectedWallet] = useState<string>('');

  const parentNode = useRef<any>()

  useEffect(() => {
    setVisible(open)
  }, [open])

  const addLightningWallet = () => {
    const newWallet = lightning.createWallet({
      id: 'wallet-id' + Math.random(),
      userId: 'user-id' + Math.random(),
      name: '',
      unit: BitcoinUnit.Sats
    })
    lightning.applyWallet(newWallet)
    console.log("Add Lightning Wallet");
  }

  return (
    <CurrentPage open={open}>
      <AccountPageShadow ref={parentNode} open={open}>
        <TransitionablePortal
          open={visible}
          transition={{animation: 'fade left', duration: 250}}
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
                    lightning.hasReachedLimitation
                      ? 'Wallet Reaches Limitation'
                      : 'Add a Lightning Wallet'
                  }
                  inverted
                  trigger={
                    <span>
                      <AddIcon
                        onClick={addLightningWallet}
                        disabled={lightning.hasReachedLimitation}
                      />
                    </span>
                  }
                />
              </WalletListHeader>

              <WalletListContentContainer>
                <WalletListContent>
                  <WalletCard
                    key={current?.id}
                    walletType={'bitcoin'}
                    balance={0.0001}
                    selected={selectedWallet === current?.id}
                    onClick={() => {
                      if(current) {
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
                        id={wallet.id}
                        walletType={'lightning'}
                        name={wallet.name}
                        balance={10000}
                        selected={selectedWallet === wallet.id}
                        onClick={() => {
                          setSelectedWallet(wallet.id);
                          switchToWallet(WalletType.LightningWallet, wallet.userId);
                        }}
                        unit={wallet.unit}
                      />
                    ))
                  }
                  <AddLightningWallet onAddWallet={addLightningWallet} />
                </WalletListContent>
              </WalletListContentContainer>

            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>
      </AccountPageShadow>
    </CurrentPage>
  )
})
