import React, { useEffect, useRef, useState } from 'react'
import { TransitionablePortal } from "semantic-ui-react";
import {
  AccountPageShadow, CurrentPage,
  WalletListContainer,
  WalletListContent,
  WalletListContentContainer,
  WalletListHeader,
  WalletListModal
} from "./sytles";

export const WalletList = ({open, close}: any) => {
  const { current } = useAppStore()
  const [visible, setVisible] = useState<boolean>(open)
  const parentNode = useRef<any>()

  useEffect(() => {
    setVisible(open)
  }, [open])

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
                <span>+</span>
              </WalletListHeader>

              <WalletListContentContainer>
                <WalletListContent>
                  <WalletCard key={current?.id} type={'bitcoin'} balance={0.0001}/>
                  {
                    [2, 3].map(wallet => (
                      <WalletCard key={wallet} type={'lightning'} balance={10000}/>
                    ))
                  }
                </WalletListContent>
              </WalletListContentContainer>

            </WalletListContainer>
          </WalletListModal>
        </TransitionablePortal>
      </AccountPageShadow>
    </CurrentPage>
  )
}

import { WalletCard } from "./WalletCard";
import { useAppStore } from "../../mobx";
