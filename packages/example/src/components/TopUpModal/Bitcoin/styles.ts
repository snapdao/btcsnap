import { FlexCenter } from './../../../kits/Layout/Flex/index';
import { Caption } from './../../../kits/Layout/Text/Body/index';
import styled from 'styled-components';
import { Divider, Radio } from 'semantic-ui-react';
import { FlexBetween } from '../../../kits';

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

export const AddressCaption = styled(Caption)`
  display: flex;
  align-items: center;
  height: 48px;
`;

export const LeftTitleHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  margin: 20px 20px 0;
  h3 {
    margin-left: 10px;
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

export const SendTitle = styled.span.attrs({ className: 'send-title' })`
  display: flex;
  align-items: center;
  color: #9095A3;
  font-weight: 600;
  ~ .send-title {
    margin-top: 32px;
  }
  > svg {
    margin-left: 4px;
  }
`;

export const SendBody = styled.div`
  padding: 32px 32px 24px;
`;

export const SendAmountContainer = styled.div`
  margin-top: 8px;
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

export const ResultSuccessSection = styled.div`
  width: 100%;
  padding: 24px 32px 32px;
`;

export const BalanceContainer = styled(FlexBetween)`
  margin-top: 8px;
  width: 100%;
  `;

export const AddressBox = styled(FlexCenter)`
  align-items: center;
  gap: 0 4px;

  .icon-info:hover path {
    fill: var(--sk-color-pri50);
  }
`;

export const PendingContainer = styled(FlexCenter)`
  flex-direction: column;
  padding: 64px 0;
`

export const ResultContainer = styled(FlexCenter)`
  flex-direction: column;
  padding: 4px 0 24px;
`

export const PendingIconContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pending-icon {
    width: 96px;
    height: 96px;
  }
`

