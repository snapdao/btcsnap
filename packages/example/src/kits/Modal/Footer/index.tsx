import { ComponentPropsWithoutRef } from 'react';
import { Container } from './styles';

interface Props extends ComponentPropsWithoutRef<'div'> {
  [k: string]: any;
}

const ModalFooter = ({ children, ...args }: Props) => {
  return <Container {...args}>{children}</Container>;
};

export default ModalFooter;
