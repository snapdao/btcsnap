import styled from 'styled-components';

export const ApplicationBackground = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f3fa;
`;

export const ApplicationContainer = styled.div`
  position: relative;
  width: 960px;
  height: 640px;
  background: #ffffff;
  border: 1px solid #e1e6f0;
  border-radius: 20px;
  display: flex;
`;

export const CookieInfo = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  bottom: 24px;
  width: 528px;
  height: 64px;
  background: #ffffff;
  margin-left: -264px;
  z-index: 10000;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  & > div {
    display: flex;
    justify-content: space-between;
    & > span {
      width: 44px;
      height: 32px;
      padding: 6px 12px;
      margin-top: 4px;
      border-radius: 10px;
      cursor: pointer;
      :hover {
        color: #ffffff;
        background: #f58300;
        transition: 0.2s;
      }
      :not(:hover) {
        color: #111214;
        background: #f0f3fa;
        transition: 0.2s;
      }
    }
  }
`;

export const PrivacyLink = styled.span`
  position: relative;
  color: #ff6c0a;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 1px;
    background: #ff6c0a;
    transition: width 0.25s ease-in-out;
  }
  :hover {
    &::after {
      width: 100%;
    }
  }
`;
