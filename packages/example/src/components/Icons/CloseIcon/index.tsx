import React from 'react';
import './index.css';

interface CloseIconProps {
  size?: 'small' | 'medium';
  onClick: () => void,
  isDisabled?: boolean
}

const CloseIcon = ({ onClick, isDisabled, size = 'medium' }: CloseIconProps) => {
  const svgSize = size === 'medium' ? 14 : 9;
  const disabledClass = isDisabled ? 'Close-container-disabled' : 'Close-container';
  const sizeClass = size === 'medium' ? '' : 'small';
  return (
    <div className={`${disabledClass} ${sizeClass}`} onClick={onClick}>
      <svg width={svgSize} height={svgSize} viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1 1L13 13M13 1L1 13' stroke='#111214' strokeWidth='1.5'/>
      </svg>
    </div>
  );
};

export default CloseIcon;
