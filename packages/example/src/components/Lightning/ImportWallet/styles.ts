import styled from 'styled-components';
import { Modal } from '../../../kits';
import { Button as SnapButton } from 'snapkit';

export const ImportWalletModal = styled(Modal)`
  && {
    height: 476px;
    position: absolute;
    bottom: 0;
  }
`;

export const ImportWalletContainer = styled.div`
  margin: 20px 32px 32px;
  position: relative;
`;

export const ImportWalletHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #111214;
`;

export const WalletNameContainer = styled.div`
  margin-top: 32px;
`;

export const WalletKeyContainer = styled.div`
  margin-top: 24px;
`;

export const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  line-height: 20px;
  color: #9095A3;
`;

export const WalletNameInput = styled.input`
  width: 100%;
  height: 48px;
  outline: none;
  border: none;
  border-bottom: 1px solid #e1e6f0;
`;

export const KeyLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  height: 20px;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .icon-info:hover path {
    fill: var(--sk-color-pri50);
  }
`;

export const KeyInputContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 108px;
  position: relative;
`;

export const KeyInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 14px;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  resize: none;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }

  color: #111214;

  :focus-visible {
    outline: none;
    border-color: #F58300;
  }
`;

export const UploaderContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 40px;
  height: 28px;
  border: 1px solid #E1E6F0;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;

  :hover {
    background: rgba(0, 0, 0, 0.04);
    border-color: #F58300;
  }
`;

export const Uploader = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  display: none;
`;

export const ImportWalletErrorTip = styled.p`
  margin: 12px 0 0;
  height: 20px;
  color: #F54814;
`;

export const Button = styled(SnapButton)`
  margin-top: 40px;
  color: #111214;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
  background-color: #F0F3FA;

  && {
    :hover {
      background-color: #F58300;
    }

    :disabled {
      cursor: not-allowed;
      color: #9095A3;
      background-color: #E1E6F0;
    }
  }
`;
