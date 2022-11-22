import styled from 'styled-components';
import { Button, ButtonProps } from 'snapkit';

export const ButtonWrap = styled(Button)`
  && {
    font-weight: 600;

    &:disabled,
    &.disabled {
      cursor: not-allowed;
    }

    &.error {
      background: var(--sk-color-r60);
      color: white;
    }
  }
`;
