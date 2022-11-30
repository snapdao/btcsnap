import { FlexBetween } from './../../Layout/Flex/index';
import styled, { css } from 'styled-components';
import { Body, Caption } from './../../Layout/Text/Body/index';

export const Container = styled(FlexBetween)<{ hoverable: boolean }>`
  padding: 12px;
  margin: 10px 0;
  background: white;
  border-radius: 12px;
  transition: all 0.25s;
  ${(props) =>
    props.hoverable
      ? css`
          color: var(--sk-color-n80);
          cursor: pointer;
          &:hover {
            background: var(--c-ntd04);
          }
        `
      : css`
          color: var(--sk-color-n50);
        `}
`;

export const Title = styled(Body)``;

export const Content = styled(Caption)`
  color: var(--sk-color-n80);
`;
