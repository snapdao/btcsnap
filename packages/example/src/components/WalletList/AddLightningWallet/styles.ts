import styled from "styled-components";

export const LightningWalletTipsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  height: 92px;
  width: 240px;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.25s;
  background-color: #FFFFFF;

  :hover {
    background: rgba(0, 0, 0, 0.04);
    transition: 0.25s;
    cursor: pointer;
  }
`

export const LightningWalletTipsContent = styled.div`
  padding: 16px 16px 16px 48px;
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #111214;
  }
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #9095A3;
  }
`

export const StyledLightningTipsIcon = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`
