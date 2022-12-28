import React from 'react';
import { MoreIconContainer } from './styles';

export const MoreIcon = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <MoreIconContainer {...props}>
      <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M2.5 7.5C1.675 7.5 1 8.175 1 9C1 9.825 1.675 10.5 2.5 10.5C3.325 10.5 4 9.825 4 9C4 8.175 3.325 7.5 2.5 7.5ZM15.5 7.5C14.675 7.5 14 8.175 14 9C14 9.825 14.675 10.5 15.5 10.5C16.325 10.5 17 9.825 17 9C17 8.175 16.325 7.5 15.5 7.5ZM9 7.5C8.175 7.5 7.5 8.175 7.5 9C7.5 9.825 8.175 10.5 9 10.5C9.825 10.5 10.5 9.825 10.5 9C10.5 8.175 9.825 7.5 9 7.5Z' fill='white'/>
      </svg>
    </MoreIconContainer>
  );
};
