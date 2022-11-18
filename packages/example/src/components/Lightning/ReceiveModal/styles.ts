import styled from 'styled-components';

export const ReceiveContainer = styled.div`
  background: linear-gradient(
    185.06deg,
    rgba(255, 108, 10, 0.012) 4.07%,
    rgba(255, 108, 10, 0.06) 95.93%
  );
  background-repeat: no-repeat;
  background-size: 100% 226px;
`;

export const AddressPathContainer = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #656d85;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
  gap: 6px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};

  & > span:nth-child(2) {
    color: #111214;
    line-height: 24px;
    margin: 0 4px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LoadingContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: iconRotate 1s infinite;
    animation-timing-function: linear;
  }
  @keyframes iconRotate {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
