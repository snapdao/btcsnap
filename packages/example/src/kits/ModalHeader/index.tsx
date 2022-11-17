import { ReactNode } from 'react';
import CloseIcon from '../../components/Icons/CloseIcon';
import { Container, Content, Left, Right } from './styles';

interface Props {
  left?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  showCloseIcon?: boolean;
}

const ModalHeader = ({
  left,
  children,
  onClose,
  showCloseIcon = true,
}: Props) => {
  return (
    <Container>
      <Left>{left}</Left>
      <Content>{children}</Content>
      <Right>
        {onClose && showCloseIcon && <CloseIcon onClick={onClose} />}
      </Right>
    </Container>
  );
};

export default ModalHeader;
