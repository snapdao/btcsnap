import React, { useState } from 'react';
import { AddIcon } from '../../Icons/AddIcon';
import { ReactComponent as LightningIcon } from '../image/lightning.svg';
import {
  LightningWalletTipsContainer,
  LightningWalletTipsContent,
  StyledLightningTipsIcon,
} from './styles';
import { useAppStore } from '../../../mobx';
import { H4, SubCaption } from '../../../kits';

interface AddLightningWalletProps {
  onAddWallet: () => void;
  disabled?: boolean;
}

export const AddLightningWallet = ({
  onAddWallet,
  disabled = false,
}: AddLightningWalletProps) => {
  const { lightning } = useAppStore();
  const [isHoveringAddingTips, setIsHoveringAddTips] = useState<boolean>(false);

  return (
    <LightningWalletTipsContainer
      onMouseEnter={() => setIsHoveringAddTips(true)}
      onMouseLeave={() => setIsHoveringAddTips(false)}
      isFixed={lightning.walletLength < 2}
      onClick={onAddWallet}
      disabled={disabled}
    >
      <StyledLightningTipsIcon>
        {!disabled && isHoveringAddingTips ? (
          <AddIcon />
        ) : (
          <LightningIcon />
        )}
      </StyledLightningTipsIcon>
      <LightningWalletTipsContent>
        <H4>Add Lightning Wallets</H4>
        <SubCaption>Fast transaction timings and low transaction fees</SubCaption>
      </LightningWalletTipsContent>
    </LightningWalletTipsContainer>
  );
};
