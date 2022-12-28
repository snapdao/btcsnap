import React, { CSSProperties } from 'react';
import { AdjustIconContainer } from './styles';

const AdjustIcon = (args: {
  style?: CSSProperties;
  onClick?: (event: any) => void;
  disabled?: boolean;
}) => (
  <AdjustIconContainer>
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...args}>
      <path
        d='M2.25 5.5L5.5 5.5L5.5 7.5H7V2H5.5L5.5 4H2.25V5.5Z'
        fill='currentColor'
      />
      <path
        d='M15.75 12.5L12.5 12.5V10.5H11V16H12.5V14H15.75V12.5Z'
        fill='currentColor'
      />
      <path d='M9.5 14V12.5H2.25V14H9.5Z' fill='currentColor' />
      <path d='M15.75 4H8.5V5.5L15.75 5.5V4Z' fill='currentColor' />
    </svg>
  </AdjustIconContainer>
);

export default AdjustIcon;
