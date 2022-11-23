import { CSSProperties, ReactNode } from 'react';
import CloseIcon from '../../../components/Icons/CloseIcon';
import { Container, Content, Left, Right } from './styles';

interface Props {
  left?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  showCloseIcon?: boolean;
  style?: CSSProperties;
  className?: string;
  enableXPadding?: boolean;
  bannerMode?: boolean
}

const ModalHeader = ({
  left,
  children,
  onClose,
  showCloseIcon = true,
  enableXPadding = true,
  bannerMode = false,
  ...args
}: Props) => {
  return (
    <Container bannerMode={bannerMode} enableXPadding={enableXPadding} {...args}>
      <Left>{left}</Left>
      <Content>{children}</Content>
      <Right>
        {onClose && showCloseIcon && <CloseIcon onClick={onClose} />}
      </Right>
    </Container>
  );
};

export default ModalHeader;
