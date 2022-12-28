import React from 'react';

const LightningIcon = ({
  size = 48,
  onClick,
  className = '',
}: {
  size?: number;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`lightning-icon ${className}`}
      onClick={onClick}>
      <rect
        x='1'
        y='1'
        width='46'
        height='46'
        rx='14'
        fill='url(#paint0_linear_3229_20145)'
      />
      <rect
        x='1'
        y='1'
        width='46'
        height='46'
        rx='14'
        fill='url(#paint1_radial_3229_20145)'
        fillOpacity='0.12'
      />
      <path
        d='M25.125 21.75H33L22.875 36.375V26.25H15L25.125 11.625V21.75Z'
        fill='white'
      />
      <rect
        x='1'
        y='1'
        width='46'
        height='46'
        rx='14'
        stroke='white'
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_3229_20145'
          x1='48'
          y1='48'
          x2='-9.43729'
          y2='29.8265'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2D5DE0' />
          <stop offset='1' stopColor='#437CF5' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_3229_20145'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='rotate(45.2114) scale(34.0671 70.5963)'>
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default LightningIcon;
