import React, { useCallback } from 'react';
import { BitcoinUnit, WalletType } from '../../../interface';
import {
  WalletCardBalance,
  WalletCardContainer,
  WalletCardContent,
  WalletCardHeader,
} from './styles';
import { MoreIcon } from '../../Icons/MoreIcon';
import { useAppStore } from '../../../mobx';
import { observer } from 'mobx-react-lite';
import { Popup } from '../../../kits/Popup';

interface WalletCardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  id: string;
  walletType: WalletType;
  name: string;
  balance: string | number;
  unit: BitcoinUnit;
  selected: boolean;
  onClick?: () => void;
  available?: boolean;
}

export const WalletCard = observer(
  ({
    id,
    walletType,
    balance,
    selected,
    onClick,
    name,
    unit,
    available = true,
  }: WalletCardProps) => {
    const { lightning, switchToWallet, current } = useAppStore();

    const edit = useCallback(
      (event) => {
        event.stopPropagation();
        if (walletType === WalletType.LightningWallet) {
          // TODO: render edit modal
          lightning.removeWallet(id);
          if (!lightning.hasLightningWallet) {
            switchToWallet(WalletType.BitcoinWallet, current?.xpub);
          }
        }
      },
      [id, walletType],
    );

    // TODO: fetch balance
    // useEffect(() => {
    //   const fetch = async () => {
    //     const res = await getBalance(id);
    //   };
    //   fetch();
    // }, [id]);

    const walletCardItem = (
      <WalletCardContainer active={selected} onClick={onClick}>
        <WalletCardContent type={walletType} available={available}>
          <WalletCardHeader>
            <span>{name}</span>
            <MoreIcon onClick={edit} disabled={!available} />
          </WalletCardHeader>
          <WalletCardBalance>
            {balance} {unit}
          </WalletCardBalance>
        </WalletCardContent>
      </WalletCardContainer>
    );

    return available ? (
      walletCardItem
    ) : (
      <Popup
        position="top center"
        content={!available && 'Not available on Testnet'}
        inverted
        trigger={walletCardItem}
      />
    );
  },
);
