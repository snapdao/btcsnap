import styled, { keyframes } from "styled-components";
import { TransactionInfo, TransactionType } from "snapkit";

const iconRotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 22px;
`
export const ModalHeaderCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 60px;
`

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ModalHeaderLabel = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-transform: uppercase;
`

export const TransactionListArea = styled.div`
  border-top: 1px solid #F0F3FA;
  & > div {
    padding: 0 16px;
  }
  & ::-webkit-scrollbar {
    display: none;
    width: 6px;
  }
  & ::-webkit-scrollbar-track {
    background: none;
  }
  & ::-webkit-scrollbar-thumb {
    background: #9095A3;
  }
`

export const TransactionLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 28px;
  cursor: pointer;
  & > span {
    font-weight: 600;
  }
  :hover {
    color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    color: #656D85;
    transition: 0.25s;
  }
`

export const TransactionDetailsTop = styled.div`
  height: 256px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`

export const TransactionDetailsBottom = styled.div`
  padding: 32px;
`

export const TransactionAmount = styled.div`
  text-align: center;
  padding: 16px 0 32px 0;
`

interface TitleProps {
  isSendType: boolean
}

export const TransactionAmountIcon = styled.div<TitleProps>`
  position: relative;
  width: 88px;
  height: 88px;
  margin: 0 auto;
  border-radius: 50%;
  outline: ${props => props.isSendType ? '1.5px solid #FF6C0A' : '1.5px solid #FF6C0A'};
  svg:first-child {
    position: absolute;
    left: 26px;
    top: 26px;
  }
  svg:nth-child(2) {
    position: absolute;
    left: 56px;
    top: 56px;
    z-index: 99;
  }
  img {
    position: absolute;
    left: 56px;
    top: 56px;
    z-index: 999;
    animation: ${iconRotate} 1s linear infinite;
  }
`

export const BackgroundDiv = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  left: 56px;
  top: 56px;
  border-radius: 50%;
  background: linear-gradient(185.06deg,rgba(255,250,248,1) 4.07%,rgba(255,248,240,1) 95.93%);
`

export const TransactionAmountValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 20px;
  span:first-child {
    display: inline-block;
    max-width: 310px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 36px;
    line-height: 48px;
  }
  span:last-child {
    color: #F58300;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-left: 4px;
  }

`

export const TransactionDetailsLink = styled.p`
  text-align: center;
  font-weight: 600;
  a {
    color: #FF6C0A;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`

export const TransactionItem = styled(TransactionInfo)`
  cursor: pointer;
  & > div {
    position: relative;
  }
  & > div::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -0.5px;
    background: var(--sk-color-ntd04);
  }
  svg path {
    fill:  ${props => props.type ===  TransactionType.SEND ? 'var(--sk-color-r60)' : 'var(--sk-color-g60)'};
  }
  :hover {
    background: var(--sk-color-ntd04);
    transition: 0.25s;
  }
  :not(:hover) {
    background: #FFFFFF;
    transition: 0.25s;
  }
`

// ----- Transaction Details -----
export const TransactionDetailsStatus = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  padding-bottom: 20px;
  span:first-child {
    color: #9095A3;
  }
`

export const TransactionDetailsFromTo = styled.div`
  position: relative;
  padding-top: 20px;
  ::before {
    position: absolute;
    content: '';
    width: 100%;
    top: 0;
    border-top: 1px solid #F0F3FA;
  }
  ::after {
    position: absolute;
    content: '';
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid #F0F3FA;
  }
  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    span:first-child {
      color: #9095A3;
      font-weight: 600;
    }
    span:last-child {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`

export const TransactionDetailsAmountFee = styled.div`
  position: relative;
  padding-top: 20px;
  ::after {
    position: absolute;
    content: '';
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid #F0F3FA;
  }
  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    span:first-child {
      display: inline-block;
      color: #9095A3;
      font-weight: 600;
    }
    span:last-child {
      display: flex;
      justify-content: space-between;
      span:first-child {
        color: #111214;
        font-weight: 400;
        max-width: 250px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span:last-child {
        color: #F58300;
        font-weight: 400;
        margin-left: 4px;
      }
    }
  }
`

export const PendingSpan = styled.span`
  color: #F58300;
`

export const CompletedSpan = styled.span`
  color: #21A35D;
`

export const FailedText = styled.p`
  color: #F54814;
  text-align: right;
  margin-bottom: 20px;
`

export const MaskArea = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  background: #FFFFFF;
  mask: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`

export const LoadingIconContainer = styled.div`
  text-align: center;
  margin: 30px 0;
  svg {
    animation: ${iconRotate} 1s linear infinite;
  }
`

export const BottomTipsContainer = styled.div`
  text-align: center;
  margin: 30px 0;
  span {
    display: inline-block;
    color: #9095A3;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    div {
      height: 18px;
      margin-left: 6px;
      svg path{
        fill: #9095A3;
      }
      :hover {
        svg path {
          fill: #FF6C0A;
        }
      }
    }
  }
  a {
    display: block;
    width: 187px;
    color: #FF6C0A;
    margin: 0 auto;
    line-height: 20px;
    :hover {
    text-decoration: underline;
    transition: 0.25s;
    }
    :not(:hover) {
    text-decoration: none;
    transition: 0.25s;
  }
}
`
