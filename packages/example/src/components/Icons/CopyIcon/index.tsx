import React from 'react';
import { CSSProperties } from 'styled-components';

const CopyIcon = ({
  size = 18,
  style,
  onClick,
}: {
  size?: number;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <svg
      width={size + 1}
      height={size}
      viewBox='0 0 19 18'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
      onClick={onClick}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 3.5H8V6H12.5V10.5H15V3.5ZM12.5 12H16.5V2H6.5V6H2.5V16H12.5V12ZM4 7.5H11V14.5H4V7.5Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default CopyIcon;
