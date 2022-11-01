import React from 'react'
import { BitcoinUnit } from "../../interface";
import { WalletCardAmount, WalletCardContainer, WalletCardHeader, } from "./sytles";
import { MoreIcon } from "../Icons/MoreIcon";

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
        <MoreIcon />
      </WalletCardHeader>
      <WalletCardAmount>
        {balance} {unit}
      </WalletCardAmount>
    </WalletCardContainer>
  )
}