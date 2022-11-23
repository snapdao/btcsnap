import React, { useState } from 'react';
import { AddIcon } from '../../Icons/AddIcon';
import { ReactComponent as LightningIcon } from '../image/lightning.svg';
import {
  LightningWalletTipsContainer,
  LightningWalletTipsContent,
  StyledLightningTipsIcon,
} from './styles';
import { useAppStore } from '../../../mobx';

interface AddLightningWalletProps {
  onAddWallet: () => void;
  shouldDisableAddition: boolean;
}

export const AddLightningWallet = ({
  onAddWallet,
  shouldDisableAddition,
}: AddLightningWalletProps) => {
  const { lightning } = useAppStore();
  const [isHoveringAddingTips, setIsHoveringAddTips] = useState<boolean>(false);

  return (
    <LightningWalletTipsContainer
      onMouseEnter={() => setIsHoveringAddTips(true)}
      onMouseLeave={() => setIsHoveringAddTips(false)}
      isFixed={lightning.walletLength < 2}
      onClick={() => !shouldDisableAddition && onAddWallet()}
      shouldDisableAddition={shouldDisableAddition}>
      <StyledLightningTipsIcon>
        {!shouldDisableAddition && isHoveringAddingTips ? (
          <AddIcon />
        ) : (
          <LightningIcon />
        )}
      </StyledLightningTipsIcon>
      <LightningWalletTipsContent>
        <span>Add Lightning Wallets</span>
        <p>Fast transaction timings and low transaction fees</p>
      </LightningWalletTipsContent>
    </LightningWalletTipsContainer>
  );
};
