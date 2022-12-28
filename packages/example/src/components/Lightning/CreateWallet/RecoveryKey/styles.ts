import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { Button as SnapButton } from 'snapkit';

export const RecoverKeyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Top = styled.div`
  padding: 0 32px 40px;
  margin-top: 40px;
`;

export const Title = styled.p`
  margin: 32px 0 24px;
  color: #111214;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  span {
    color: #ff6c0a;
  }
`;

export const Box = styled.div`
  position: relative;
  width: 376px;
  min-height: 76px;
  padding: 14px 24px;
  margin-bottom: 32px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.1);
`;

export const BoxContainer = styled.div`
  display: flex;
  gap: 0 20px;
  justify-content: flex-end;
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 376px;
  min-height: 76px;
  padding: 28px 26px;
  border-radius: 16px;
  span {
    margin-left: 8px;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
  :hover {
    background: none;
    opacity: 0;
    transition: 0.25s;
  }
  :not(:hover) {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    transition: 0.25s;
  }
`;

export const Text = styled.p`
  color: #111214;
  word-break: break-word;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export const ActionButton = styled(SnapButton)`
  width: 178px;
  height: 40px;
  padding: 10px 16px;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.25s;
  border: 1px solid #e1e6f0;
  border-radius: 10px;
  white-space: nowrap;
  & .icon-prefix {
    color: #656d85;
  }
  && > div {
    color: #000;
    padding: 0;
    & > div:last-child {
      margin-left: 4px;
    }
  }
  && {
    background: #fff;
    :hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.04),
          rgba(0, 0, 0, 0.04)
        ),
        #ffffff;
    }
  }
`;

export const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 32px 32px;
`;

export const SavedCheckbox = styled(Checkbox)`
  & > label {
    &::after {
      border-radius: 0.21428571rem;
      color: #ffffff !important;
      background: #f58300;
    }
  }
`;

export const GoToWalletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const GoToWalletTip = styled.span`
  margin-left: 12px;
  color: #656d85;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export const GoToWalletButton = styled(SnapButton)`
  width: 376px;
  color: #ffffff;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
  && > div {
    color: #ffffff;
  }
  && {
    :hover {
      background: #f58300;
    }
    :not(:hover) {
      background: #111214;
    }
    :disabled {
      cursor: no-drop;
      background: #e1e6f0;
    }
  }
`;
