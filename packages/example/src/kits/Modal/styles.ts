import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

export const StyledModal = styled(Modal)`
  && {
    height: 640px;
    width: 440px;
    padding: 0;
    border-radius: 20px;
  }
`;

export const StyledModalContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  position: relative;

  & .ui.page.modals {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
`;

export const CloseIconContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 100;
`;
