import { keyframes } from 'styled-components';

export const circularMotion = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;
