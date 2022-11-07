import styled from "styled-components";
import Confetti from "react-confetti";
import { Modal, Checkbox } from "semantic-ui-react";
import { Button as SnapButton } from "snapkit"


export const Container = styled.div`
  position: relative;
  width: 320px;
  height: 114px;
  padding: 16px;
  background: #fff8f3;
  border-radius: 8px;
`

export const Text = styled.p`
  color: #111214;
  font-size: 14px;
  line-height: 20px;
`

export const Button = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 62px;
  height: 32px;
  padding: 6px 12px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: #F58300;
    transition: 0.25s;
  }

  :not(:hover) {
    background: #111214;
    transition: 0.25s;
  }
`

// ----- Last Step -----

export const LNSetupModal = styled(Modal)`
  && {
    height: 514px;
    width: 360px;
    border-radius: 20px;
    && > div {
      background: radial-gradient(50% 50% at 0% 0%, rgba(255, 182, 10, 0.12) 0%, rgba(255, 182, 10, 0) 100%), radial-gradient(50% 50% at 100% 0%, rgba(255, 108, 10, 0.14) 0%, rgba(255, 108, 10, 0) 100%);
      border-radius: 20px;
    }
  }
`

export const LNSetupModalContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 40px 32px;
`

export const LastStepIcon = styled.div`
  width: 96px;
  height: 96px;
  margin: 40px auto 0;
`

export const LastStepTitle = styled.h2`
  color: #111214;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  margin-top: 16px;
`

export const LastStepText = styled.p`
  color: #9095A3;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  margin: 8px 0 0 0;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  & > span {
    display: block;
    margin: 8px 0;
    text-align: center;
    color: #9095A3;
    height: 24px;
  }
`

export const CreateButton = styled(SnapButton)`
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  transition: 0.25s;

  && {
    background: #FFFFFF;
    :hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
`

export const StartButton = styled(SnapButton)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
  && {
    :hover {
      background-color: #F58300;
    }
  }
`

export const ConfettiContainer = styled(Confetti)`
  inset: ${props => -(props.height! / 2 - 257)}px 0 0 ${props => -(props.width! / 2 - 180)}px !important;
`

export const CloseContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  margin: 20px 20px 0;
  p {
    height: 24px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-left: 4px;
  }
`

// Create wallet

export const CreateWalletModal = styled(Modal)`
  && {
    position: relative;
    width: 440px;
    height: 640px;
    background: #FFFFFF;
    border-radius: 20px;
  }
`


export const CreateContentTop = styled.div`
  padding: 0 32px;
  margin-top: 48px;
`

export const CreateContentBottom = styled.div`
  padding: 32px;
`

export const CreateContent = styled.div`
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CreateTitle = styled.p`
  color: #9095A3;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`

export const CreateInput = styled.input`
  width: 376px;
  height: 48px;
  outline: none;
  border: none;
  border-bottom: 1px solid #E1E6F0;
`

export const CreateLNWalletButton = styled(SnapButton)`
  width: 376px;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 600;
  border: none;
  transition: 0.25s;
  && > div {
    color: #FFFFFF;
  }
  && {
    :hover {
      background: #F58300;
    }
    :not(:hover) {
      background: #111214;
    }
  }
`

export const ImportLNWalletLink = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: 24px;
  color: #656D85;
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: 0.25s;
  :hover {
    color: #F58300;
  }
`

// Recovery Key

export const RecoverKeyModal = styled(Modal)`
  && {
    position: relative;
    width: 440px;
    height: 640px;
    background: #FFFFFF;
    border-radius: 20px;
  }
`

export const RecoveryContainer = styled.div`
  position: relative;
  height: 348px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`

export const RecoveryTop = styled.div`
  padding: 0 32px;
  margin-top: 40px;
`

export const RecoveryTitle = styled.p`
  margin-top: 32px;
  color: #111214;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  span {
    color: #FF6C0A;
  }
`

export const RecoveryKeyBox = styled.div`
  position: relative;
  width: 376px;
  height: 100px;
  padding: 14px 24px;
  margin-bottom: 32px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.1);
`

export const KeyBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const RecoveryKeyMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 376px;
  height: 100px;
  padding: 40px 52px;
  border-radius: 16px;
  span {
    margin-left: 8px;
    color: #FFFFFF;
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
`

export const RecoveryKey = styled.p`
  color: #111214;
  word-break: break-word;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

export const DownloadButton = styled(SnapButton)`
  width: 178px;
  height: 40px;
  padding: 10px 16px;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.25s;
  && > div {
    color: #FFFFFF;
    padding: 0;
    & > div:last-child {
      margin-left: 4px;
    }
  }
  && {
    :hover {
      background: #F58300;
    }
    :not(:hover) {
      background: #111214;
    }
  }
`

export const RecoveryBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 272px;
  padding: 0 32px 32px;
`

export const SavedCheckbox = styled(Checkbox)`
  & > label {
    &::after {
      color: #FFFFFF !important;
      background: #F58300;
    }
  }
`

export const GoToWalletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export const GoToWalletTip = styled.span`
  margin-left: 12px;
  color: #656D85;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

export const GoToWalletButton = styled(SnapButton)`
  width: 376px;
  color: #FFFFFF;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
  && > div {
    color: #FFFFFF;
  }
  && {
    :hover {
      background: #F58300;
    }
    :not(:hover) {
      background: #111214;
    }
    :disabled {
      cursor: no-drop;
      background: #E1E6F0;
    }
  }
`
