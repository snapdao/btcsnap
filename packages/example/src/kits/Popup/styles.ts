import styled  from "styled-components";
import { Popup } from "semantic-ui-react";

export const StyledPopup = styled(Popup)<{width: string; breakLine?: boolean}>`
  @keyframes ShowPopup {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &.ui.popup.visible {
    animation: ShowPopup 250ms ease-in-out;
  }

  line-break: ${props => props.breakLine ? 'anywhere' : 'normal'};
`
