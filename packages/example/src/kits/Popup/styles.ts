import styled  from 'styled-components';
import { Popup } from 'semantic-ui-react';

export const StyledPopup = styled(Popup)<{width: string; breakLine?: boolean}>`
  @keyframes ShowPopup {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  && {
    padding: 8px;
    border: 1px solid #E1E6F0;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }

  &.ui.popup.visible {
    animation: ShowPopup 250ms ease-in-out;
  }

  line-break: ${props => props.breakLine ? 'anywhere' : 'normal'};
`;
