import styled from 'styled-components';
import { Modal, Checkbox } from 'semantic-ui-react';
import { Button as SnapButton } from 'snapkit';

export const CreateWalletModal = styled(Modal)`
  && {
    position: relative;
    width: 440px;
    height: 640px;
    background: #ffffff;
    border-radius: 20px;
  }
`;

export const CreateContentTop = styled.div`
  padding: 0 32px;
  margin-top: 48px;
`;

export const CreateContentBottom = styled.div`
  padding: 32px;
`;

export const CreateContent = styled.div`
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CreateTitle = styled.p`
  color: #9095a3;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const CreateInput = styled.input`
  width: 376px;
  height: 48px;
  outline: none;
  border: none;
  border-bottom: 1px solid #e1e6f0;
`;

export const CreateLNWalletButton = styled(SnapButton)`
  width: 376px;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 600;
  border: none;
  transition: 0.25s;
  && > div {
    color: white;
  }
  && {
    :hover {
      background: #f58300;
    }
    :not(:disabled, :hover) {
      background: #111214;
    }
  }
`;

export const ImportLNWalletLink = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: 24px;
  color: #656d85;
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: 0.25s;
  :hover {
    color: #f58300;
  }
`;
