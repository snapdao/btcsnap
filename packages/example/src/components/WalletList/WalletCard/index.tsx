import React from 'react'
import { BitcoinUnit } from "../../../interface";
import { WalletCardBalance, WalletCardContainer, WalletCardContent, WalletCardHeader, } from "./styles";
import { MoreIcon } from "../../Icons/MoreIcon";

interface WalletCardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  walletType: 'bitcoin' | 'lightning';
  id?: string;
  name?: string;
  balance: string | number;
  unit?: BitcoinUnit;
  selected: boolean
  onClick?: () => void
}

export const WalletCard = ({walletType, balance, selected, onClick}: WalletCardProps) => {
  const unit = walletType === 'bitcoin' ? BitcoinUnit.BTC : BitcoinUnit.Sats
  return (
    <WalletCardContainer active={selected} onClick={onClick}>
      <WalletCardContent type={walletType}>
        <WalletCardHeader>
          <span>{walletType}</span>
          <MoreIcon/>
        </WalletCardHeader>
        <WalletCardBalance>
          {balance} {unit}
        </WalletCardBalance>
      </WalletCardContent>
    </WalletCardContainer>
  )
}