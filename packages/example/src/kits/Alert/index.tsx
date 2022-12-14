import { ComponentPropsWithoutRef } from 'react';
import { Container } from './styles';

export interface Props extends ComponentPropsWithoutRef<'div'>{
  [x: string]: any;
}

export default function Alert({ ...args }: Props) {
  return <Container {...args} />;
}
