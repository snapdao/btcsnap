import { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';
import { H3 } from '../Layout/Text';

interface Props extends ComponentPropsWithoutRef<'div'> {
  loading?: boolean
}

const ButtonTextWrap = styled(H3)<{ loading?: boolean }>`
  color: var(--sk-color-n60);
  cursor: pointer;
  transition: all 0.25s;
  ${props => {
    return props.loading
      ? css`
          cursor: not-allowed;
          color: var(--sk-color-n40);
        `
      : css`&:hover {
        color: var(--sk-color-pri50);
      }`;
  }}
`;

const ButtonText = ({ children, ...args }: Props) => {
  return (
    <ButtonTextWrap {...args}>
      {children}
    </ButtonTextWrap>
  );
};

export default ButtonText;
