import React, { useCallback, useState } from 'react'
import {
  InvoiceInput,
  InvoiceTitle,
  LightningSendMainContainer,
  LightningSendModal, LightningSendSecondaryContainer,
  SendMainHeader,
  SendModalContent,
  ButtonsContainer,
  Button, PrimaryButton
} from "./styles";
import SendIcon from "../Icons/SendIcon";
import CloseIcon from "../Icons/CloseIcon";

export const LightningSend = ({close}: { close: () => void }) => {
  const [isInvoiceValid, setIsInvoiceValid] = useState<boolean>(false);
  
  const checkInvoice = useCallback((event: any) => {
    const invoice = event.target.value;
    setIsInvoiceValid(!!invoice);
  }, [setIsInvoiceValid])
  
  return (
    <LightningSendModal open={true}>
      <SendModalContent>
        <LightningSendMainContainer>
          <SendMainHeader>
            <div>
              <SendIcon size={36}/>
              <span>SEND</span>
            </div>
            <CloseIcon onClick={close}/>
          </SendMainHeader>
          <InvoiceTitle>
            Invoice
          </InvoiceTitle>
          <InvoiceInput
            autoFocus={true}
            onInput={checkInvoice}
            placeholder='Lightning Invoice / Lightning Address'
          />
        </LightningSendMainContainer>
        <LightningSendSecondaryContainer>
          <ButtonsContainer>
            <Button onClick={close}>Cancel</Button>
            <PrimaryButton primary disabled={!isInvoiceValid}>Confirm</PrimaryButton>
          </ButtonsContainer>
        </LightningSendSecondaryContainer>
      </SendModalContent>
    </LightningSendModal>
  )
}