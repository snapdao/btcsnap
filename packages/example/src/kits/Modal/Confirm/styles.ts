import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import ModalContainer from '../Container';

export const StyledModal = styled(Modal)`
  && {
    width: 360px;
    min-height: 200px;
    padding: 0;
    border-radius: 20px;
  }
`;

export const Container = styled(ModalContainer)`
  && {
    padding: 24px 32px 110px;
    text-align: center;
    color: var(--sk-color-n60);
  }
`;
