import styled, { css } from 'styled-components';
import { circularMotion, Modal } from '../../../../kits';
import { FlexCenter } from '../../../../kits/Layout/Flex';

export const ModalHeader = styled(Modal.Header)`
  display: flex;
  justify-content: center;
`;

export const RecordStatusContainer = styled.div`
  text-align: center;
`;

export const RecordType = styled.div<{isSend?: boolean; isOnChain?: boolean}>`
  position: relative;
  width: 88px;
  height: 88px;
  margin: 0 auto;
  border-radius: 50%;
  outline: 1.5px solid var(--c-g60);;
  ${props => props.isSend ? css`
    outline-color: var(--c-pri60);
  ` : ''}
  ${props => props.isOnChain ? css`
    outline-color: var(--c-b60);
  ` : ''}

  & svg {
    position: absolute;
    left: 26px;
    top: 26px;
  }
`;

export const RecordStatus = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  left: 56px;
  top: 56px;
  border-radius: 50%;
  background: linear-gradient(185.06deg,rgba(255,250,248,1) 4.07%,rgba(255,248,240,1) 95.93%);
  
  && > {
    svg, img {
      position: absolute;
      top: 0;
      left: 0;
    }
    img {
      animation: ${circularMotion} 1s linear infinite;
    }
  }
`;

export const RecordAmount = styled.div<{lowlight?:boolean}>`
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
    ${props => props.lowlight ? css`color: var(--c-n50);` : ''};
  }
  span:last-child {
    color: #F58300;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-left: 4px;
  }
`;

export const LightningMark = styled(FlexCenter)`
  margin-top: 8px;
  gap: 2px;
  color: var(--c-n60);
`;

export const FixedBottomContainer = styled.div`
  position: absolute;
  left: 32px;
  bottom: 0;
  width: calc(100% - 64px);
`;

export const BottomButtonContainer = styled.div`
  padding-bottom: 32px;
  width: 100%;
  background-color: #FFFFFF;
`;

export const BottomGradientLayerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  div {
    height: 84px;
    border-radius: 0 0 20px 20px;
  }
`;
