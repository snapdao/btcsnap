import styled from 'styled-components';
import { circularMotion } from '../../../kits';

export const ReceiveContainer = styled.div`
  background: linear-gradient(
    185.06deg,
    rgba(255, 108, 10, 0.012) 4.07%,
    rgba(255, 108, 10, 0.06) 95.93%
  );
  background-repeat: no-repeat;
  background-size: 100% 226px;
`;

export const AddressPathContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  width: 375px;
  color: #656d85;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
  gap: 6px;
`;

export const AddressBoxWrap = styled.div`
  width: 268px;
  height: 268px;
  display: flex;
  margin: 32px auto 40px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #F58300, #F58300) left top no-repeat,
              linear-gradient(to bottom, #F58300, #F58300) left top no-repeat,
              linear-gradient(to left, #F58300, #F58300) right top no-repeat,
              linear-gradient(to bottom, #F58300, #F58300) right top no-repeat,
              linear-gradient(to left, #F58300, #F58300) left bottom no-repeat,
              linear-gradient(to bottom, #F58300, #F58300) left bottom no-repeat,
              linear-gradient(to left, #F58300, #F58300) right bottom no-repeat,
              linear-gradient(to left, #F58300, #F58300) right bottom no-repeat;
  background-color: #FFFFFF;
  background-size: 1.64px 9.84px, 9.84px 1.64px, 1.64px 9.84px, 9.84px 1.64px;
`;

export const AddressBoxLabel = styled.div`
  display: inline-block;
  padding: 14px 24px;
  border-radius: 16px;
  background-color: #F7F9FC;
`;

export const LoadingContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: ${circularMotion} 1s infinite;
    animation-timing-function: linear;
  }
`;
