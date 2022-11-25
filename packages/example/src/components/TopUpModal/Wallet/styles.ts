import styled from 'styled-components';
import { Divider, Radio } from 'semantic-ui-react';

export const ActionButton = styled.button`
  width: 96px;
  height: 96px;
  border: 1px solid #E1E6F0;
  border-radius: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  :hover {
    border-color: #F58300;
    cursor: pointer;
    transition: 0.25s;
  }

  :not(:hover) {
    border-color: #E1E6F0;
    transition: 0.25s;
  }
`;

export const SendContainer = styled.div`
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
  :last-child {
    background: #FFFFFF;
  }
`;

export const SendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

export const LeftTitleHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  margin: 20px 20px 0;
  p {
    height: 24px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-left: 4px;
  }
`;

export const MiddleTitleHeader = styled.div`
  height: 40px;
  margin: 20px 20px 0;
  padding: 8px 0;
  p {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    line-height: 24px;
  }
`;

export const CloseContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const SendTitle = styled.span`
  display: inline-block;
  color: #9095A3;
  font-weight: 600;
`;

export const SendBody = styled.div`
  padding: 32px 32px 0;
`;

export const SendAmountContainer = styled.div`
  margin-top: 8px;
`;

export const SendAmountItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:first-child {
    margin-bottom: 8px;
  }
`;

export const SendAmountInput = styled.div`
  display: flex;
  align-items: center;
  & > input {
    border: none;
    font-size: 40px;
    font-weight: 400;
    max-width: 280px;
    line-height: 52px;
    padding: 0;
    background: transparent;
  }
  & > span {
    display: flex;
    align-items: center;
    margin-top: 14px;
    color: #F58300;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    cursor: pointer;
  }
`;

export const SendAmountMax = styled.span`
  display: inline-block;
  width: 35px;
  font-size: 12px;
  font-weight: 600;
  color: #F58300;
  margin-top: 10px;
  padding: 0 4px;
  cursor: pointer;
  background: rgba(255, 108, 10, 0.2);
  border-radius: 4px;
  :hover {
    color: #FFFFFF;
    background-color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    transition: 0.25s;
  }
`;

export const SendTextError = styled.div`
  margin-bottom: 8px;
  line-height: 20px;
  color: #EB2F00;
`;

export const SendAmountTransition = styled.div`
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  & > span:first-child {
    display: inline-block;
    max-width: 200px;
    overflow: hidden;
    color: #111214;
  }
  & > span {
    display: inline-block;
    line-height: 24px;
    color: #F58300;
    margin-left: 4px;
  }
`;

export const SendAmountFee = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span:nth-child(2) {
    display: flex;
    align-items: center;
    margin-left: 16px;
    cursor: pointer;
    span {
      margin-right: 4px;
    }
    span:nth-child(2) {
      color: #656D85;
    }
    :hover {
      & > svg > path {
        fill: #F58300;
        transition: 0.25s;
      }
    }
    :not(:hover) {
      & > svg > path {
        fill: #656D85;
        transition: 0.25s;
      }
    }
  }
`;

export const DividerLine = styled(Divider)`
  margin: 31px 0 !important;
`;

export const SendAvailableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
`;

export const SendAvailableText = styled.span`
  color: #656D85;
  span {
    margin-right: 4px;
    color: #111214;
  }
  span:nth-child(2) {
    margin: 0 8px;
  }
`;

export const SendToContainer = styled.div`
  padding: 32px 32px 0 32px;
`;

export const SendToInput = styled.div`
  position: relative;
  & > input {
    display: block;
    width: 100%;
    height: 48px;
    line-height: 20px;
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid #E1E6F0;
    :focus {
      border-bottom: 1px solid #F58300;
    }
  }
`;

export const SendButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px;
  position: absolute;
  bottom: 32px;
`;

export const CancelButton = styled.button`
  width: 176px;
  height: 48px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  :hover {
    background: #E1E6F0;
    transition: 0.25s;
  }
  :not(:hover) {
    background: #F0F3FA;
    transition: 0.25s;
  }
`;

// ----- Transaction Fee -----

export const TransactionFeeContainer = styled.div`
  padding: 20px 32px 24px 32px;
`;

export const TransactionFeeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 12px;
  outline: 1px solid #E1E6F0;
  border-radius: 12px;
  :hover {
    cursor: pointer;
    outline-color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    outline-color: #E1E6F0;
    transition: 0.25s;
  }
`;

export const TransactionFeeLevel = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
    line-height: 24px;
    color: #111214;
  }

  span:last-child {
    display: inline-block;
    height: 21px;
    line-height: 19px;
    font-weight: 600;
    font-size: 12px;
    color: #F58300;
    padding: 1px 4px;
    background: rgba(255, 108, 10, 0.1);
    border-radius: 6px;
  }
`;

export const TransactionFeeItemValue = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  span {
    color: #656D85;
  }
  span:last-child {
    color: #9095A3;
  }
`;

export const TransactionFeeRadio = styled(Radio)`
  & > label::before {
    width: 18px !important;
    height: 18px !important;
    border: 2px solid #9095A3 !important;
  }
  & > label::after {
    top: 2px !important;
    left: 1px !important;
    width: 16px !important;
    height: 16px !important;
    background-color: #F58300 !important;
    transform: scale(.5) !important;
  }
  &.checked > label::before {
    border: 2px solid #F58300 !important;
  }
  &.checked > label::after {
    background-color: #F58300 !important;
  }
`;

export const Button = styled.button`
  position: absolute;
  bottom: 30px;
  width: 376px;
  height: 48px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  :hover {
    background-color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    background: #111214;
    transition: 0.25s;
  }
  :disabled {
    background-color: #E1E6F0;
  }
`;
export const FailedContainer = styled.div`
  width: 100%;
  padding: 24px 32px 0;
`;

export const FailedText = styled.p`
  color: #9095A3;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  span {
    white-space: nowrap;
  }
`;
