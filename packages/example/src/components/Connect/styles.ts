import styled, { css } from 'styled-components';
import { FlexCenter } from '../../kits';
import { Browsers } from 'snapkit';

export const ModalHeader = styled(FlexCenter)`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 40px;
`;

export const ModalContentContainer = styled.div<{ show: boolean }>`
  height: 100%;
  position: relative;
  width: 280px;
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.25s;

  ${props => props.show ? css`
    opacity: 1;
  ` : css`
    opacity: 0;
  `};
`;

export const StepViewContainer = styled.div`
  height: calc(514px - 60px - 40px);
  width: 360px;
  overflow: hidden;
  position: absolute;
  top: 60px;
`;

export const ConnectStepsContainer = styled.div<{ index: number }>`
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: 0.25s;

  left: ${props => -(props.index - 1) * 360}px;
`;

export const StyledBrowsers = styled(Browsers)`
  && {
    background: radial-gradient(50% 50% at 0% 0%, rgba(255, 182, 10, 0.12) 0%, rgba(255, 182, 10, 0) 100%), radial-gradient(50% 50% at 100% 0%, rgba(255, 108, 10, 0.14) 0%, rgba(255, 108, 10, 0) 100%), #FFFEFF;
    .browsers-container {
      a {
        padding: 12px 24px;
      }
    }
  }
`;

export const ConnectButton = styled.button`
  width: 280px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #FFFFFF;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  background-color: #111214;
  transition: 0.25s;

  :hover {
    background-color: #F58300;
    cursor: pointer;
    color: #FFFFFF;
    transition: 0.25s;
  }

  :disabled {
    background-color: #E1E6F0;
  }
`;

export const StyledConnectButton = styled(ConnectButton)`
  :hover svg path {
    fill: #FFFFFF;
  }
`;
