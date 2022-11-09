import styled, { css } from 'styled-components';

export const Spin = styled.div<{ enable: boolean; color?: string }>`
  color: ${(props) => props.color};
  ${(props) =>
    props.enable &&
    css`
      animation: iconRotate 1s infinite;
      animation-timing-function: linear;
    `}

  @keyframes iconRotate {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
