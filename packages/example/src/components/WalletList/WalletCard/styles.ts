import styled from "styled-components";
import YellowCard from "../image/YellowCard.svg";
import BlueCard from "../image/BlueCard.svg";

export const WalletCardContainer = styled.div<{active: boolean}>`
  padding: 6px;
  border-radius: 24px;
  border: 2px solid ${props => props.active ? '#F58300' : 'transparent'};
`

export const WalletCardContent = styled.div<{type: 'bitcoin' | 'lightning'}>`
  padding: 16px 20px;
  width: 240px;
  height: 135px;
  border-radius: 16px;
  background-image: url(${props => props.type === 'bitcoin' ? YellowCard : BlueCard});
  :hover {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08)) drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
  }
`

export const WalletCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    text-transform: capitalize;
  }
`

export const WalletCardBalance = styled.div`
  margin-top: 12px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #F7F9FC;
`