import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { InvoiceInfo, InvoiceInfoContainer } from "../styles";

export const ConfirmModal = styled(Modal)`
  && {
    height: 564px;
    width: 440px;
    padding: 0;
    border-radius: 20px;
    position: absolute;
    bottom: 0;
  }
`

export const ConfirmModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ConfirmMainContainer = styled.div`
  padding: 20px 20px 0;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`

export const ConfirmSecondaryContainer = styled.div`
  padding: 4px 32px 32px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  hr {
    margin: 20px 0 0;
    width: 100%;
    border: 1px solid #F0F3FA;
  }
`

export const ConfirmMainHeader = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  & > span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #111214;
  }

  & > div {
    position: absolute;
    right: 0;
  }
`

export const ConfirmMainContent = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SendingText = styled.span`
  display: block;
  font-weight: 600;
  color: #656D85;
`

export const SendingAmount = styled.span`
  margin: 8px 0 12px;
  font-size: 36px;
  line-height: 48px;
  color: #111214;
  position: relative;

  & > span {
    display: block;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #F58300;
    position: absolute;
    right: -50px;
    top: 50%;
    align-self: end;
  }
`

export const SendingTo = styled.span`
  margin: 12px 0 0;
  font-weight: 600;
  color: #111214;
`

export const ConfirmInfoContainer = styled(InvoiceInfoContainer)``

export const ConfirmInfo = styled(InvoiceInfo)`
  margin-top: 20px;
`

export const ConfirmHighlight = styled.div`
  display: inline-block;
  color: #F58300;
  margin-left: 4px;
`
