import React from 'react';

export const LightningIcon2 = ({ size = 18 }: {
  size?: number;
}) => {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M13 10H20L11 23V14H4L13 1V10Z' fill='url(#paint0_linear_2637_11193)'/>
      <defs>
        <linearGradient id='paint0_linear_2637_11193' x1='20' y1='23' x2='-0.00328018' y2='18.397' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2D5DE0'/>
          <stop offset='1' stopColor='#437FF5'/>
        </linearGradient>
      </defs>
    </svg>
  );
};
