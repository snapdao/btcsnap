import React from 'react'
import { BitcoinUnit } from "../../interface";
import { WalletCardAmount, WalletCardContainer, WalletCardHeader, } from "./sytles";

interface WalletCardProps {
  type: 'bitcoin' | 'lightning';
  id?: string;
  balance: string | number;
  unit?: BitcoinUnit;
}

export const WalletCard = ({type, balance}: WalletCardProps) => {
  const unit = type === 'bitcoin' ? BitcoinUnit.BTC : BitcoinUnit.Sats
  return (
    <WalletCardContainer type={type}>
      <WalletCardHeader>
        <span>{type}</span>
        <span>...</span>
      </WalletCardHeader>
      <WalletCardAmount>
        {balance} {unit}
      </WalletCardAmount>
    </WalletCardContainer>
  )
}