import { ChangeEvent, ReactNode } from 'react';
import { Input } from '../../Input';
import { Container, Title } from './styles';

export interface Props {
  title: ReactNode;
  value?: string;
  onInput?: (ev: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode
}

export const ListForm = ({ title, value, onInput, children }: Props) => {
  return (
    <Container>
      <Title className='title'>{title}</Title>
      <Input value={value} onInput={onInput}/>
      {children}
    </Container>
  );
};
