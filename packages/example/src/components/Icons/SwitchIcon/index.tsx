import React, { CSSProperties } from 'react';

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
}

const SwitchIcon = ({ onClick, style }: Props) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={style}
    onClick={onClick}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 6L8.00005 2L5 6H11ZM8 14L5 10H11L8 14Z'
      fill='currentColor'
    />
  </svg>
);

export default SwitchIcon;
