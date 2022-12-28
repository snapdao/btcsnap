import React from 'react';

const ReceiveIcon = ({ size, color='#F58300' }: {size: number, color?: string}) => {
  return (
    <svg width={size} height={size} viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M35 35.0001L35.0002 32.0001L26.5608 23.5607L38.0607 12.0608L35.9393 9.93945L24.4395 21.4393L16.0002 13.0001L13 13.0001L13 35.0001L35 35.0001ZM30.7576 32.0001L16 17.2425L16 32.0001L30.7576 32.0001Z' fill={color}/>
    </svg>
  );
};

export default ReceiveIcon;
