import React from 'react';
import { CSSProperties } from 'styled-components';

const EditIcon = ({
  size = 36,
  style,
  onClick,
}: {
  size?: number;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 36 36'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
      onClick={onClick}>
      <path
        d='M12.414 22.0001L22.556 11.8581L21.142 10.4441L11 20.5861V22.0001H12.414ZM13.243 24.0001H9V19.7571L20.435 8.32208C20.6225 8.13461 20.8768 8.0293 21.142 8.0293C21.4072 8.0293 21.6615 8.13461 21.849 8.32208L24.678 11.1511C24.8655 11.3386 24.9708 11.5929 24.9708 11.8581C24.9708 12.1232 24.8655 12.3776 24.678 12.5651L13.243 24.0001ZM9 26.0001H27V28.0001H9V26.0001Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default EditIcon;
