import React, { useCallback } from 'react'
import { BitcoinUnit, WalletType } from "../../../interface";
import { WalletCardBalance, WalletCardContainer, WalletCardContent, WalletCardHeader, } from "./styles";
import { MoreIcon } from "../../Icons/MoreIcon";
import { useAppStore } from "../../../mobx";
import { observer } from "mobx-react-lite";

interface WalletCardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  id: string;
  walletType: WalletType;
  name: string;
  balance: string | number;
  unit: BitcoinUnit;
  selected: boolean
  onClick?: () => void
  available?: boolean
}

export const WalletCard = observer(({id, walletType, balance, selected, onClick, name, unit, available = true}: WalletCardProps) => {
  const { lightning } = useAppStore()

  const edit = useCallback((event) => {
    event.stopPropagation();
    if(walletType === WalletType.LightningWallet) {
      // TODO: render edit modal
      lightning.removeWallet(id);
    }
  }, [id, walletType])

  return (
    <WalletCardContainer active={selected} onClick={onClick}>
      <WalletCardContent type={walletType} available={available}>
        <WalletCardHeader>
          <span>{name}</span>
          <MoreIcon onClick={edit} disabled={!available}/>
        </WalletCardHeader>
        <WalletCardBalance>
          {balance} {unit}
        </WalletCardBalance>
      </WalletCardContent>
    </WalletCardContainer>
  )
})
