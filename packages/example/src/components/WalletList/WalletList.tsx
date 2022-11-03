import React, { useEffect, useRef, useState } from 'react'
import { Popup, TransitionablePortal } from "semantic-ui-react";
import { ReactComponent as LightningIcon } from './image/lightning.svg';
import { WalletCard } from "./WalletCard";
import { useAppStore } from "../../mobx";
import { AddIcon } from "../Icons/AddIcon";
import {
  AccountPageShadow,
  CurrentPage,
  LightningWalletTipsContainer,
  LightningWalletTipsContent,
  StyledLightningTipsIcon,
  WalletListContainer,
  WalletListContent,
  WalletListContentContainer,
  WalletListHeader,
  WalletListModal
} from "./sytles";
import { observer } from "mobx-react-lite";
import { BitcoinUnit, WalletType } from "../../interface";

export const WalletList = observer(({open, close}: any) => {
  const {current, lightning, user: {bitcoinUnit}, switchToWallet} = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [isHoveringAddingTips, setIsHoveringAddTips] = useState<boolean>(false)
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
                  {
                    !lightning.hasLightningWallet && (
                      <LightningWalletTipsContainer
                        onMouseEnter={() => setIsHoveringAddTips(true)}
                        onMouseLeave={() => setIsHoveringAddTips(false)}
                        onClick={addLightningWallet}
                      >
                        <StyledLightningTipsIcon>
                          {isHoveringAddingTips ? <AddIcon/> : <LightningIcon/>}
                        </StyledLightningTipsIcon>
                        <LightningWalletTipsContent>
                          <span>Add Lightning Wallets</span>
                          <p>Fast transaction timings and low transaction fees</p>
                        </LightningWalletTipsContent>
                      </LightningWalletTipsContainer>
                    )
                  }
                </WalletListContent>
              </WalletListContentContainer>

            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>
      </AccountPageShadow>
    </CurrentPage>
  )
})
