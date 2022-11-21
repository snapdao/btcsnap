import React, { ChangeEvent, ReactNode } from 'react';
import { InputProps } from 'semantic-ui-react';
import { Icon } from 'snapkit';
import styled from 'styled-components';
import { Input } from '../../Input';
import { Container, Title } from './styles';

interface Props {
  title: ReactNode;
  value?: string;
  onInput?: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const ListForm = ({ title, value, onInput }: Props) => {
  return (
    <Container>
      <Title className="title">{title}</Title>
      <Input value={value} onInput={onInput}></Input>
    </Container>
  );
};
