import React, { useCallback } from 'react';
import { BitcoinUnit, WalletType } from '../../../interface';
import {
  WalletCardBalance,
  WalletCardContainer,
  WalletCardContent,
  WalletCardHeader,
  WalletCardName,
} from './styles';
import { observer } from 'mobx-react-lite';
import { Popup } from '../../../kits/Popup';
import AdjustIcon from '../../Icons/AdjustIcon';

interface WalletCardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  id: string;
  walletType: WalletType;
  name: string;
  balance: string | number;
  unit: BitcoinUnit;
  selected: boolean;
  onClick?: () => void;
  available?: boolean;
  showEditWalletModal: (walletData: { id: string; type: WalletType }) => void;
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
    showEditWalletModal,
  }: WalletCardProps) => {
    const edit = useCallback(
      (event) => {
        event.stopPropagation();
        showEditWalletModal({
          id,
          type: walletType,
        });
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
            <WalletCardName>{name}</WalletCardName>
            <AdjustIcon
              style={{ color: 'white' }}
              onClick={edit}
              disabled={!available}
            />
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
        position='top center'
        content={!available && 'Not available on Testnet'}
        inverted
        trigger={walletCardItem}
      />
    );
  },
);
