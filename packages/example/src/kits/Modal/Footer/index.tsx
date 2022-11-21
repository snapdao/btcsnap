import { ReactNode } from 'react';
import CloseIcon from '../../../components/Icons/CloseIcon';
import { Container } from './styles';

interface Props {
  children: ReactNode;
}

const ModalFooter = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default ModalFooter;
