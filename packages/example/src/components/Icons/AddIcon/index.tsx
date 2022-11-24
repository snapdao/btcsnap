import React from 'react';
import { AddIconContainer } from './styles';

export const AddIcon = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <AddIconContainer {...props}>
      <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M8.25 8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25Z' fill='#111214'/>
      </svg>
    </AddIconContainer>
  );
};
