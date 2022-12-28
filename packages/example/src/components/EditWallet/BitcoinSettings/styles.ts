import styled from 'styled-components';
import { Radio } from 'semantic-ui-react';

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 168px;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalHeaderLabel = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

export const SettingContent = styled.div`
  padding: 0;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin: 10px 0;
  color: #111214;
  & > span:first-child {
    font-size: 16px;
    line-height: 24px;
    color: #9095A3;
    position: relative;
  }
  & > span:last-child {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    text-transform: capitalize;
  }
  & > span:last-child :first-child {
    margin-right: 4px;
  }
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    transition: background 0.25s;
  }
`;

export const SettingRadio = styled(Radio)`
  width: 34px !important;
  display: flex !important;
  align-items: center !important;
  & > input {
    width: 34px !important;
    height: 20px !important;
  }
  & > label {
    min-height: 20px !important;
    padding-top: 0 !important;
  }
  & > label::before {
    width: 34px !important;
    height: 20px !important;
    background: #E1E6F0 !important;
  }
  & > label::after {
    width: 10px !important;
    height: 10px !important;
    top: 5px !important;
    left: 5px !important;
    background: #FFFFFF !important;
    box-shadow: none !important;
  }
  &.checked > label::after {
    left: 20px !important;
  }
  &.ui.checked.fitted.toggle.checkbox > label::before {
    background-color: #F58300 !important;
  }
`;

// ----- Address Type -----
export const AddressContainer = styled.div`
  padding: 20px 32px 6px 32px;
`;

export const AddressItem = styled.div`
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

export const AddressItemLabel = styled.div`
  display: flex;
  flex-direction: column;
  & > span:nth-child(1) {
    font-size: 16px;
    line-height: 24px;
    color: #111214;
    margin-bottom: 8px;
  }
  & > span:nth-child(2) {
    line-height: 20px;
    color: #656D85;
  }
`;

export const AddressItemRadio = styled(Radio)`
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

export const AddressTips = styled.div`
  margin: 0 32px 24px;
  padding: 8px 12px 8px;
  font-size: 12px;
  background: rgba(255, 108, 10, 0.1);
  border-radius: 12px !important;
  color: #656D85;
  & > p {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  & > p >span {
    color: #111214;
  }
`;

export const MaskArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  background: #FFFFFF;
  mask: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`;

export const DynamicAddressContainer = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  span:last-child{
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .icon-info:hover path {
    fill: var(--sk-color-pri50);
  }
`;
