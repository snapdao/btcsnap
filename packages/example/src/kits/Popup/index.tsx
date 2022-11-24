import { StyledPopup } from './styles';
import { StrictPopupProps } from 'semantic-ui-react';

interface CustomPopupProps extends StrictPopupProps {
  breakLine?: boolean;
  maxCharsPerLine?: number;
}

export const Popup = ({breakLine = false, ...props}: CustomPopupProps) => {
  return <StyledPopup
    position='top center'
    inverted
    breakLine={breakLine}
    {...props}
  />;
};
