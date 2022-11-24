import styled from 'styled-components';
import { Button as SnapButton } from 'snapkit';

export const ResultContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ResultMainContainer = styled.div`
  height: 350px;
  background: linear-gradient(185deg, rgba(255, 108, 10, 0.01) 4%, rgba(255, 108, 10, 0.06) 96%);
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

export const ResultMainContent = styled.div`
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PaymentResult = styled.p`
  margin: 16px 0 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #111214;
`;

export const PaymentAmount = styled.p`
  display: inline-block;
  margin: 24px 0 0;
  font-weight: 400;
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
    right: -36px;
    top: 18px;
    align-self: end;
  }
`;

export const PaymentParticipantContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const PaymentParticipant = styled.span`
  display: inline-block;
  padding: 0 6px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  font-size: 16px;
  line-height: 24px;
  color: #111214;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultSecondaryContainer = styled.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const Button = styled(SnapButton)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
`;

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
`;
