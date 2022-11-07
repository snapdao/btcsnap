import React, { useState } from "react";
import { AddIcon } from "../../Icons/AddIcon";
import { ReactComponent as LightningIcon } from "../image/lightning.svg";
import { LightningWalletTipsContainer, LightningWalletTipsContent, StyledLightningTipsIcon } from "./styles";
import { useAppStore } from "../../../mobx";

interface AddLightningWalletProps {
  onAddWallet: () => void
}

export const AddLightningWallet = ({onAddWallet}: AddLightningWalletProps) => {
  const {lightning} = useAppStore()
  const [isHoveringAddingTips, setIsHoveringAddTips] = useState<boolean>(false)

  if(lightning.hasLightningWallet){
    return null;
  }

  return (
    <LightningWalletTipsContainer
      onMouseEnter={() => setIsHoveringAddTips(true)}
      onMouseLeave={() => setIsHoveringAddTips(false)}
      onClick={onAddWallet}
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
