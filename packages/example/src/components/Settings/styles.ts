import styled from 'styled-components';
import { Radio } from 'semantic-ui-react';

export const SettingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

export const SettingLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  svg {
    width: 36px;
    height: 36px;
    margin: 0 4px 0 0;
  }
  svg path {
    fill: #F58300;
  }
  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
    text-transform: uppercase;
  }
`;

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
  padding: 32px 20px 152px 20px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
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
  &[aria-disabled="true"] {
    cursor: not-allowed;
    & > span:nth-child(2) {
      opacity: 0.3;
    }
    :hover {
      background: transparent;
    }
  }
`;

// ----- Network -----
export const NetworkContainer = styled.div`
  padding: 20px 20px 24px;
`;

export const NetworkItem = styled.div<{checked: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  :hover {
    cursor: ${props => props.checked ? 'default' : 'pointer'};
    background: ${props => props.checked ? '#FFFFFF' : 'rgba(0, 0, 0, 0.04)'};
    transition: 0.25s;
  }
  :not(:hover) {
    background: #FFFFFF;
    transition: 0.25s;
  }
`;

export const NetworkItemLabel = styled.div`
  display: flex;
  align-items: center;
  & > span {
    line-height: 24px;
    margin-left: 4px;
  }
`;

export const NetworkItemRadio = styled(Radio)`
  & > label::before {
    width: 18px !important;
    height: 18px !important;
    border: 2px solid #9095A3 !important;
  }
  & > label::after {
    width: 16px !important;
    height: 16px !important;
    top: 2px !important;
    left: 1px !important;
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

//----- Privacy Policy -----
export const PrivacyContainer = styled.div`
  height: 468px;
  margin: 20px 0;
  padding: 0 32px;
  overflow-y: hidden;
  :hover {
    overflow-y: overlay;
  }
  & > p:first-child {
    color: #9095A3;
  }
  & > h2 {
    font-size: 20px;
    line-height: 30px;
    margin: 20px 0 12px 0;
  }
  & > p:last-child {
    mask: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;

//----- Terms of Service -----
export const TermsContainer = styled.div`
  height: 468px;
  margin: 20px 0;
  padding: 0 32px;
  overflow-y: hidden;
  :hover {
    overflow-y: overlay;
  }
  & > p:first-child {
    color: #9095A3;
  }
  & > h2 {
    font-size: 20px;
    line-height: 30px;
    margin: 20px 0 12px 0;
  }
  & > p:last-child {
    padding-bottom: 20px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;

//----- AboutSection -----
export const AboutSectionContainer = styled.div`
  height: 200px;
  margin: 20px 0;
  padding: 0 32px;
  overflow-y: hidden;
  :hover {
    overflow-y: overlay;
  }
  & > h2 {
    font-size: 20px;
    line-height: 30px;
    margin: 20px 0 12px 0;
  }
  & > p:last-child {
    mask: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
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
