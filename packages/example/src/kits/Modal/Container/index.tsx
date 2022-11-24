import { ReactNode, RefObject } from 'react';
import { CSSProperties } from 'styled-components';
import { Container } from './styles';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  ref?: RefObject<any>;
}

const ModalContainer = ({ children, ...args }: Props) => {
  return <Container {...args}>{children}</Container>;
};

export default ModalContainer;
