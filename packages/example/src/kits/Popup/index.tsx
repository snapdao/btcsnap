import { StyledPopup } from './styles';
import { PopupProps } from 'semantic-ui-react';

interface CustomPopupProps extends PopupProps {
  breakLine?: boolean;
  maxCharsPerLine?: number;
}

export const Popup = ({ breakLine = false, ...props }: CustomPopupProps) => {
  return <StyledPopup
    position='top center'
    inverted
    breakLine={breakLine}
    {...props}
  />;
};
