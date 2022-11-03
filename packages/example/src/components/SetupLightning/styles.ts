import styled from "styled-components";
import Confetti from "react-confetti";
import {Modal} from "semantic-ui-react"


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
    border-radius:20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 32px;
    border-radius: 20px;
  }
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

export const CreateButton = styled.button`
  position: absolute;
  bottom: 128px;
  width: 280px;
  height: 48px;
  padding: 12px 24px;
  margin: 0 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  :hover {
    background: rgba(0, 0, 0, 0.04);
    transition: 0.25s;
  }
  :not(:hover) {
    color: #111214;
    background: #FFFFFF;
    transition: 0.25s;
  }
  :disabled {
    background-color: #E1E6F0;
  }
`

export const StartButton = styled.button`
  position: absolute;
  bottom: 40px;
  width: 280px;
  height: 48px;
  padding: 12px 24px;
  margin: 0 8px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  :hover {
    background-color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    background: #111214;
    transition: 0.25s;
  }
  :disabled {
    background-color: #E1E6F0;
  }
`

export const ConfettiContainer = styled(Confetti)`
  inset: ${props => -(props.height!/2 - 257)}px 0 0 ${props => -(props.width!/2 - 180)}px !important;
`

export const CloseContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`
