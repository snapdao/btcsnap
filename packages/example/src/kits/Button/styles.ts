import styled from 'styled-components';
import { Button } from 'snapkit';

export const ButtonWrap = styled(Button)`
  && {
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
