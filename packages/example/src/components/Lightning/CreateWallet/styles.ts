import { Button } from './../../../kits/Button/index';
import styled from 'styled-components';

export const ContentContainer = styled.div``;

export const CreateContentTop = styled.div`
  padding: 0 32px;
  margin-top: 48px;
`;

export const CreateContentBottom = styled.div`
  padding: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  margin: 0 20px 0;
  p {
    height: 24px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-left: 4px;
  }
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

export const CreateLNWalletButton = styled(Button)`
  width: 376px;
  text-transform: capitalize;
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
