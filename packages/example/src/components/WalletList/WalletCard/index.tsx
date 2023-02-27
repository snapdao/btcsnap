import React, { useCallback } from 'react';
import { BitcoinUnit, WalletType } from '../../../interface';
import {
  WalletCardBalance,
  WalletCardContainer,
  WalletCardContent,
  WalletCardHeader,
  WalletCardName, WalletNotice,
} from './styles';
import { observer } from 'mobx-react-lite';
import { Popup } from '../../../kits';
import AdjustIcon from '../../Icons/AdjustIcon';
import InfoIcon from '../../Icons/InfoIcon';

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
        if(!available){
          return;
        }
        event.stopPropagation();
        showEditWalletModal({
          id,
          type: walletType,
        });
      },
      [id, walletType],
    );

    const walletCardItem = (
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
        {
          walletType === WalletType.LightningWallet && (
            <Popup
              wide
              content={'The Lightning Wallet service is under maintenance. To prevent the loss of your assets, please move them to other LN wallets before April 15.'}
              trigger={(
                <WalletNotice>
                  <InfoIcon color={'#F54814'} />
                </WalletNotice>
              )}
            />
          )
        }
      </WalletCardContent>
    );

    return (
      <WalletCardContainer active={selected} onClick={onClick}>
        {
          available ?
            walletCardItem
            : (
              <Popup
                position='top center'
                content={!available && 'Not available on Testnet'}
                inverted
                trigger={walletCardItem}
              />
            )
        }
      </WalletCardContainer>
    );
  },
);
