import { circularMotion } from './../../../kits/Animation/rotate';
import styled, { css } from 'styled-components';

export const Spin = styled.div<{ enable: boolean; color?: string }>`
  color: ${(props) => props.color};
  ${(props) =>
    props.enable &&
    css`
      animation: ${circularMotion} 1s infinite;
      animation-timing-function: linear;
    `}
`;
