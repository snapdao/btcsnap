import React from 'react';

const ErrorIcon = ({ size = '45', color = '#C5CAD6', ...args }: { size?: string, color?: string }) => (
  <svg width={size} height={size} viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg' {...args}>
    <path fillRule='evenodd' clipRule='evenodd' d='M22.5 42C33.2696 42 42 33.2696 42 22.5C42 11.7304 33.2696 3 22.5 3C11.7304 3 3 11.7304 3 22.5C3 33.2696 11.7304 42 22.5 42ZM45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5ZM21 26V13H24V26H21ZM21 32V29H24V32H21Z' fill={color}/>
  </svg>

);

export default ErrorIcon;
