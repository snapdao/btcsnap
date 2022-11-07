import React from "react";
import { StyledPopup } from "./styles";
import { StrictPopupProps } from "semantic-ui-react/dist/commonjs/modules/Popup/Popup";

export const Popup = (props: StrictPopupProps) =>
  <StyledPopup
    position='top center'
    inverted
    {...props}
  />
