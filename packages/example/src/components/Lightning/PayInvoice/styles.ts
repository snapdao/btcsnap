import styled from 'styled-components';
import { Button as SnapButton } from 'snapkit';
import { Modal } from '../../../kits';

export const LightningSendModal = styled(Modal)``;

export const LightningSendContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;

  & .ui.page.modals {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
`;

export const SendModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LightningSendMainContainer = styled.div`
  width: 100%;
  padding: 0 20px 16px;
  background: linear-gradient(
    185.06deg,
    rgba(255, 108, 10, 0.012) 4.07%,
    rgba(255, 108, 10, 0.06) 95.93%
  );
  position: relative;
`;

export const SendMainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  width: auto;

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #111214;
  }
`;

export const SendMainContent = styled.div`
  margin: 32px 12px 0;
`;

export const InvoiceTitle = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #9095a3;
`;

export const InvoiceInput = styled.input<{ isValid: boolean }>`
  margin: 22px 0 16px;
  padding: 0 0 12px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #c5cad6;
  width: 100%;
  color: ${(props) => (props.isValid ? '#111214' : '#F54814')};

  ::placeholder {
    color: #c5cad6;
  }
`;

export const InvoiceError = styled.p`
  color: #f54814;
  margin-top: 8px;
`;

export const AmountTitle = styled(InvoiceTitle)`
  margin: 8px 0 0;
`;

export const AmountInput = styled.input`
  margin-top: 22px;
  padding: 0 0 12px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #c5cad6;
  width: 100%;
  color: #9095a3;

  ::placeholder {
    color: #c5cad6;
  }

  :hover {
    cursor: default;
  }
`;

export const AmountCurrencyContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  color: #656d85;
`;

export const ErrorMessage = styled.span`
  color: #f54814;
`;

export const HighLight = styled.div`
  display: inline;
  color: #111214;
`;

export const LightningSendSecondaryContainer = styled.div`
  padding: 0 32px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const InvoiceInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const InvoiceInfo = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  color: #656d85;

  span:first-child {
    font-weight: 600;
    color: #9095a3;
  }
`;

export const InvoiceDescription = styled.div`
  & > p {
    max-width: 100%;
    margin: 8px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const Button = styled(SnapButton)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
`;

export const PrimaryButton = styled(Button)`
  && {
    :hover {
      background-color: #f58300;
    }

    :disabled {
      cursor: not-allowed;
      background-color: #e1e6f0;
    }
  }
`;

export const MetaMaskInteractionTips = styled.p`
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
`;
