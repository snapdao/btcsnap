import { ReactNode, CSSProperties } from 'react';
import { Container } from './styles';

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
}

const ModalBackground = ({ children, ...args }: Props) => {
  return <Container {...args}>{children}</Container>;
};

export default ModalBackground;
