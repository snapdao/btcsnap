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
import InfoIcon from "../Icons/InfoIcon";

export const WalletList = ({open, close}: any) => {
  const {current} = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const [isHoveringAddingTips, setIsHoveringAddTips] = useState<boolean>(false)
  const parentNode = useRef<any>()

  useEffect(() => {
    setVisible(open)
  }, [open])

  const addLightningWallet = () => {
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
                  content={'Add a Lightning Wallet'}
                  inverted
                  trigger={<AddIcon onClick={addLightningWallet} />}
                />
              </WalletListHeader>

              <WalletListContentContainer>
                <WalletListContent>
                  <WalletCard key={current?.id} type={'bitcoin'} balance={0.0001}/>
                  <WalletCard key={'lightning-wallet-01'} type={'lightning'} balance={10000}/>
                  <LightningWalletTipsContainer
                    onMouseEnter={() => setIsHoveringAddTips(true) }
                    onMouseLeave={() => setIsHoveringAddTips(false) }
                    onClick={addLightningWallet}
                  >
                    <StyledLightningTipsIcon>
                      {isHoveringAddingTips ? <AddIcon /> : <LightningIcon />}
                    </StyledLightningTipsIcon>
                    <LightningWalletTipsContent>
                      <span>Add Lightning Wallets</span>
                      <p>Fast transaction timings and low transaction fees</p>
                    </LightningWalletTipsContent>
                  </LightningWalletTipsContainer>
                </WalletListContent>
              </WalletListContentContainer>

            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>
      </AccountPageShadow>
    </CurrentPage>
  )
}
