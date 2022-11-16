import React from 'react';

const DownloadIcon = ({
  size = 48,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}>
      <rect width="48" height="48" rx="14" fill="white" fillOpacity="0.8" />
      <path
        d="M15 31H33V33H15V31ZM25 21H32L24 29L16 21H23V13H25V21Z"
        fill="black"
      />
    </svg>
  );
};

export default DownloadIcon;
