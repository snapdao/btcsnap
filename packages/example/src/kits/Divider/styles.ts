import styled from 'styled-components';
import { Props } from '.';

export const Box = styled.div<Props>`
  display: inline-block;
  width: ${({ direction }) => (direction === 'vertical' ? `1px` : `100%`)};
  height: ${({ direction }) => (direction === 'vertical' ? `100%` : `1px`)};
  margin: ${({ direction, gap }) =>
    direction === 'vertical' ? `0 ${gap}` : `${gap} 0`};
  background: ${({ color }) => color};
`;
