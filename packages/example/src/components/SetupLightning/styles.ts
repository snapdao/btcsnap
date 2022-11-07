import styled from "styled-components";
import Confetti from "react-confetti";
import { Modal } from "semantic-ui-react"
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
