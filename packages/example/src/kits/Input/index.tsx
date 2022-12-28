import React from 'react';
import { InputProps } from 'semantic-ui-react';
import { InputWrap } from './styles';

export const Input = ({ ...args }: InputProps) => {
  return <InputWrap transparent {...args} />;
};
