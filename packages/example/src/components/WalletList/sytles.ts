import styled from "styled-components";
import { Modal } from "semantic-ui-react";

export const CurrentPage = styled.div<{open: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AccountPageShadow = styled.div<{open: boolean}>`
  position: relative;
  width: 960px;
  height: 640px;
  border-radius: 20px;
  display: ${props => props.open ? 'flex' : 'none'};

  & .ui.page.modals {
    position: absolute;
    border-radius: 20px;
    background-color: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

export const WalletListModal = styled(Modal)`
  && {
    height: 624px;
    background: #FFFFFF;
    border-radius: 12px;
    width: 280px;
    position: absolute;
    right: calc(50% - 480px + 10px);
  }
`

export const WalletListContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`

export const WalletListHeader = styled.div`
  position: absolute;
  z-index: 10;
  height: 56px;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px 8px;

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #9095A3;
    text-transform: uppercase;
  }
`

export const WalletListContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(624px);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const WalletListContent = styled.div`
  margin: 80px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

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