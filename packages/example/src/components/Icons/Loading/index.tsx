import React from 'react';
import { Spin } from './style';

const LoadingIcon = ({
  spin = false,
  width = 24,
  height = 24,
  color = '#9095A3',
  ...args
}: Record<string, any>) => (
  <Spin enable={spin} style={{ width, height }} color={color} {...args}>
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.3033 6.6967C15.9461 5.33947 14.0711 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604L17.3033 6.6967Z'
        fill='currentColor'
      />
    </svg>
  </Spin>
);

export default LoadingIcon;
