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

export const LightningSendContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;

  & .ui.page.modals {
    background-color: rgba(0,0,0,0.3);
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
  width: 100%;
  padding: 20px 20px 16px;
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

export const SendMainContent = styled.div`
  margin: 32px 12px 0;
`

export const InvoiceTitle = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #9095A3;
`

export const InvoiceInput = styled.input<{ isValid: boolean }>`
  margin: 22px 0 16px;
  padding: 0 0 12px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #C5CAD6;
  width: 100%;
  color: ${props => props.isValid ? '#111214' : '#F54814'};

  ::placeholder {
    color: #C5CAD6;
  }
`

export const InvoiceError = styled.p`
  color: #F54814;
  margin-top: 8px;
`

export const AmountTitle = styled(InvoiceTitle)`
  margin: 8px 0 0;
`

export const AmountInput = styled.input`
  margin-top: 22px;
  padding: 0 0 12px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #C5CAD6;
  width: 100%;
  color: #9095A3;

  ::placeholder {
    color: #C5CAD6;
  }

  :hover {
    cursor: default;
  }
`

export const AmountCurrencyContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  color: #656D85;
`

export const HighLight = styled.div`
  display: inline;
  color: #111214;
`

export const LightningSendSecondaryContainer = styled.div`
  padding: 0 32px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const InvoiceInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const InvoiceInfo = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;

  span {
    color: #656D85;
  }

  span:first-child {
    font-weight: 600;
    color: #9095A3;
  }
`

export const InvoiceDescription = styled.div`
  & > p {
    width: 100%;
    margin: 8px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
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