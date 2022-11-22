import React from "react";
import { StyledPopup } from "./styles";
import { StrictPopupProps } from "semantic-ui-react/dist/commonjs/modules/Popup/Popup";

interface CustomPopupProps extends StrictPopupProps {
  breakLine?: boolean
  maxCharsPerLine?: number
}

export const Popup = ({breakLine = false, maxCharsPerLine = 45, ...props}: CustomPopupProps) => {
  let formattedContent = props.content;
  if(breakLine && typeof props.content === 'string'){
    formattedContent = props.content.split("").reduce((acc, cur) => {
      const lastRow = acc.split('\n').pop();
      return lastRow ? (lastRow.length < maxCharsPerLine ? acc + cur : acc + '\n' + cur) : cur
    }, '')
  }

  return <StyledPopup
    position='top center'
    inverted
    {...props}
    content={formattedContent}
  />
}
