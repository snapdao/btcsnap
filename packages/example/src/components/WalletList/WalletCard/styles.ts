import styled from 'styled-components';
import YellowCard from '../image/YellowCard.svg';
import BlueCard from '../image/BlueCard.svg';
import { WalletType } from '../../../interface';
import { H4 } from '../../../kits';

export const WalletCardContainer = styled.div<{ active: boolean }>`
  padding: 6px;
  border-radius: 24px;
  transition: 0.25s;
  border: 2px solid ${(props) => (props.active ? '#F58300' : 'transparent')};
  cursor: default;
`;

export const WalletCardContent = styled.div<{
  type: WalletType;
  available: boolean;
}>`
  cursor: pointer;
  padding: 16px 20px;
  width: 240px;
  height: 135px;
  border-radius: 16px;
  background: ${(props) => props.type === WalletType.BitcoinWallet ? '#e88b17' : '#366be9'} url(${(props) =>
  props.type === WalletType.BitcoinWallet ? YellowCard : BlueCard});
  opacity: ${(props) => (props.available ? 1 : 0.3)};
  transition: 0.25s;
  :hover {
    filter: ${(props) =>
    props.available
      ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08)) drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16))'
      : 'none'};
  }
`;

export const WalletCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    text-transform: capitalize;
  }
`;

export const WalletCardBalance = styled.div`
  margin-top: 7px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #f7f9fc;
`;

export const WalletCardName = styled(H4)`
  max-width: 165px;
  overflow: hidden;
  color: white;
  text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const WalletNotice = styled.div`
  display: inline-block;
  margin-top: 25px;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 18px;
`;
