import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { Button as SnapButton } from "snapkit";

export const LightningSendModal = styled(Modal)`
  && {
    height: 640px;
    width: 440px;
    padding: 0;
    border-radius: 20px;
  }
`

export const SendModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const LightningSendMainContainer = styled.div`
  height: 200px;
  width: 100%;
  padding: 20px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
  position: relative;
`

export const SendMainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #111214;
  }
`

export const InvoiceTitle = styled.p`
  margin: 32px 12px 22px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #9095A3;
`

export const InvoiceInput = styled.input`
  margin: 0 12px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #C5CAD6;
  width: calc(100% - 24px);
  padding-bottom: 12px;
  color: #111214;

  ::placeholder {
    font-size: 14px;
    line-height: 20px;
    color: #C5CAD6;
  }
`

export const LightningSendSecondaryContainer = styled.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`

export const Button = styled(SnapButton)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
`

export const PrimaryButton = styled(Button)`
  && {
    :hover {
      background-color: #F58300;
    }
    :disabled {
      cursor: not-allowed;
      background-color: #E1E6F0;
    }
  }
`