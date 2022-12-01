import styled, { css } from 'styled-components';
import { H4 } from './../../kits/Layout/Text/Title/index';
import { Button } from './../../kits/Button/index';
import { FlexBetween } from './../../kits/Layout/Flex/index';
import { List } from '../../kits/List';

export const AccountBackground = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f3fa;
`;

export const AccountContainer = styled.div`
  position: relative;
  width: 960px;
  height: 640px;
  background: #ffffff;
  border: 1px solid #e1e6f0;
  border-radius: 20px;
  display: flex;
`;

export const AccountLabel = styled.p`
  position: absolute;
  bottom: -88px;
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9095a3;
  transition: width 0.25s ease-in-out;
  a {
    position: relative;
    color: #9095a3;
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      left: 0;
      bottom: -1px;
      width: 0;
      height: 1px;
      background: #656d85;
      transition: width 0.25s ease-in-out;
    }
    &:hover {
      color: #656d85;
      &::after {
        width: 100%;
      }
    }
    :not(:hover) {
      transition: 0.25s;
    }
  }
  span {
    margin: 0 4px;
  }
`;

export const AccountMain = styled.div`
  width: 560px;
  padding: 40px;
  position: relative;
`;

export const AccountAside = styled.div`
  width: 400px;
  height: 100%;
  background: linear-gradient(
    222.5deg,
    rgba(250, 251, 255, 0.8) 47.82%,
    rgba(245, 247, 252, 0) 100%
  );
  border-radius: 0 20px 20px 0;
`;

export const AccountAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-end;
  margin: 40px 24px;
`;

export const AsideHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AsideBitcoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-right: 16px;
  background: #ffffff;
  border: 1px solid #e1e6f0;
  border-radius: 14px;
  cursor: pointer;
`;

export const WalletNameContainer = styled.span`
  margin: 0 12px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #111214;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const AccountAsideRefresh = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-right: 16px;
`;

export const TxListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TxListContent = styled.div`
  width: 100%;
  height: 400px;
  & > div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }
  & > div:last-child {
    border-bottom: none;
  }
`;

export const TxListEmpty = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmptyTip = styled.div`
  display: flex;
  margin-top: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #9095a3;
  text-transform: capitalize;
  div {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    padding: 1px 0;
    svg path {
      fill: #9095a3;
    }
    :hover {
      svg path {
        fill: #ff6c0a;
      }
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const TestnetSpan = styled.span`
  padding: 4px 8px;
  margin-left: 8px;
  color: #656d85;
  font-weight: 600;
  background: #e1e6f0;
  border-radius: 10px;
`;

export const BalanceContainer = styled.div`
  margin: 56px 0 76px;
`;

export const BalanceLabel = styled.p`
  text-transform: uppercase;
  color: #9095a3;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const BalanceLeftItem = styled.div<{hoverable?: boolean}>`
  display: inline-block;
  font-weight: 400;
  font-size: 48px;
  line-height: 64px;
  color: #111214;

  ${props => props.hoverable ? css`
    :hover {
      cursor: pointer;
      color: #f58300;
      transition: 0.25s;

      & > span:last-child {
        visibility: visible;
        animation: showElement 0.5s;
        animation-fill-mode: forwards;
      }
      & + div {
        visibility: hidden;
        animation: hideElement 0.25s;
        animation-fill-mode: forwards;
      }
    }
    :not(:hover) {
      color: #111214;
      transition: 0.5s;
      & > span:last-child {
        visibility: hidden;
        animation: hideElement 0.5s;
        animation-fill-mode: forwards;
      }
      & + div {
        visibility: visible;
        animation: showElement 0.5s linear;
        animation-fill-mode: forwards;
      }
    }
  ` : ''};
  @keyframes showElement {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hideElement {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const BalanceLeftLabel = styled.span`
  display: inline-block;
  line-height: 64px;
`;

export const BalanceLeftArrow = styled.span`
  display: inline-block;
  visibility: hidden;
  line-height: 40px;
  vertical-align: middle;
  opacity: 0;
`;

export const BalanceRightItem = styled.div`
  display: inline-block;
  margin-left: -25px;
  visibility: visible;
  opacity: 1;
`;

export const BalanceRightLine = styled.span`
  display: inline-block;
  font-weight: 600;
  color: #9095a3;
  margin: 0 8px;
`;

export const BalanceRightLabel = styled.span`
  display: inline-block;
  font-weight: 600;
  color: #9095a3;
  :hover {
    cursor: pointer;
    color: #f58300;
    transition: 0.25s;
  }
  :not(:hover) {
    color: #9095a3;
    transition: 0.25s;
  }
`;

export const CurrencyContainer = styled.div<{ isTestnet: boolean }>`
  margin-top: 4px;
  color: #656d85;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: ${(props) =>
    props.isTestnet ? 'line-through' : 'none'};
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalHeaderLabel = styled.span`
  font-size: 16px;
  margin-left: 4px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const AccountDetailTop = styled.div`
  background: linear-gradient(
    185.06deg,
    rgba(255, 108, 10, 0.012) 4.07%,
    rgba(255, 108, 10, 0.06) 95.93%
  );
`;

export const AccountDetailHeader = styled.div`
  padding: 26px 32px 20px;
`;

export const AccountTopBalance = styled.span`
  display: inline-block;
  line-height: 32px;
  font-size: 24px;
  font-weight: 400;
`;

export const AccountTopUnits = styled.span`
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #f58300;
  margin-left: 4px;
`;

export const AccountDetailBottom = styled.div`
  padding: 24px 32px 32px;
`;

export const LoadingContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: iconRotate 1s infinite;
    animation-timing-function: linear;
  }
  @keyframes iconRotate {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const AccountListItem = styled.div`
  margin-bottom: 24px;
`;

export const AccountListLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AccountListLabelTop = styled.span`
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
  &:nth-child(1) {
    font-weight: 400;
  }
  &:nth-child(2) {
    font-weight: 600;
  }
`;

export const AccountListLabelBottom = styled.span`
  color: #656d85;
  & > span {
    color: #111214;
    margin-left: 4px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
`;

export const ActionContainerItem = styled.div`
  margin-right: 48px;
`;

export const ActionLabel = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #656d85;
  margin-top: 12px;
  text-transform: uppercase;
`;

export const ActionButton = styled.button`
  width: 96px;
  height: 96px;
  border: 1px solid #e1e6f0;
  border-radius: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  :hover {
    border-color: #f58300;
    cursor: pointer;
    transition: 0.25s;
  }

  :not(:hover) {
    border-color: #e1e6f0;
    transition: 0.25s;
  }
`;

export const Footer = styled(FlexBetween)`
  position: absolute;
  align-items: center;
  bottom: 40px;
  width: calc(100% - 40px * 2);
  height: 36px;
`;

export const MarketPrice = styled.p<{ isTestnet: boolean }>`
  font-weight: 400;
  color: #656d85;
  margin: 0;

  span {
    font-weight: 600;
    color: #f58300;
    text-decoration-line: ${(props) => props.isTestnet ? 'line-through' : 'none'};
  }
`;

export const TopUpButton = styled(Button).attrs({
  size: 'small',
})`
  && {
    width: 100px;
    height: 36px;
    background: var(--sk-color-n00);
    border: 1px solid var(--sk-color-n30);
    color: var(--sk-color-n60);
    > div {
      padding: 0;
    }
    &:hover {
      background: var(--sk-color-n00);
    }
  }
`;

export const TopUpList = styled(List)`
  && {
    width: 200px;
    .list-field {
      justify-content: flex-start;
      margin: 0;
      > .title {
        margin-left: 4px;
      }
    }
  }
`;

export const TransactionLink = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 28px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  & > span {
    position: absolute;
    height: 18px;
  }
  :hover {
    color: #f58300;
    transition: 0.25s;
    span {
      right: -24px;
      transition: 0.25s;
    }
  }
  :not(:hover) {
    color: #656d85;
    transition: 0.25s;
    span {
      right: -18px;
      transition: 0.25s;
    }
  }
`;

export const CookieInfo = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  bottom: 24px;
  width: 528px;
  height: 64px;
  background: #ffffff;
  margin-left: -264px;
  z-index: 10000;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  & > div {
    display: flex;
    justify-content: space-between;
    & > span {
      width: 44px;
      height: 32px;
      padding: 6px 12px;
      margin-top: 4px;
      border-radius: 10px;
      cursor: pointer;
      :hover {
        color: #ffffff;
        background: #f58300;
        transition: 0.2s;
      }
      :not(:hover) {
        color: #111214;
        background: #f0f3fa;
        transition: 0.2s;
      }
    }
  }
`;

export const PrivacyLink = styled.span`
  position: relative;
  color: #ff6c0a;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 1px;
    background: #ff6c0a;
    transition: width 0.25s ease-in-out;
  }
  :hover {
    &::after {
      width: 100%;
    }
  }
`;

export const TxErrorInfo = styled(H4)`
  margin-top: 20px;
  color: var(--sk-color-n50);
`;

export const TxErrorRetryButton = styled(Button)`
  margin-top: 16px;
  padding: 12px 6px;
  background: transparent !important;
  border: 1px solid var(--sk-color-n30);
`;
