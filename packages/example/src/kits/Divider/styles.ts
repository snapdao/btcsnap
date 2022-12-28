import styled from 'styled-components';
import { Props } from '.';

export const Line = styled.div<Props>`
  display: inline-block;
  width: ${({ direction }) => (direction === 'vertical' ? '1px' : '100%')};
  height: ${({ direction }) => (direction === 'vertical' ? '100%' : '1px')};
  margin: ${({ direction, gap }) => {
    const gapLen = gap!.split(' ')?.length;
    return direction === 'vertical'
      ? gapLen > 1
        ? gap
        : `0 ${gap}`
      : gapLen > 1
        ? gap
        : `${gap} 0`;
  }};
  background: ${({ color }) => color};
`;
