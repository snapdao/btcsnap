import styled  from "styled-components";
import { Popup } from "semantic-ui-react";

export const StyledPopup = styled(Popup)`
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
`
