import React, { FunctionComponent } from 'react';

type BTCValueProps = {
  value: string;
  size: 'large' | 'normal';
  fontWeight: 'bold' | 'normal';
};

const BTCValue: FunctionComponent<BTCValueProps> = ({
  value,
  size,
  fontWeight,
}) => {
  const textSizeClass = `text-size-${size}`;
  const textWeightClass = `text-weight-${fontWeight}`;
  const textClass = `${textSizeClass} ${textWeightClass}`;
  return (
    <span>
      <span className={textClass}>{value}</span>
      <span
        style={{ fontSize: 16, marginLeft: 4, color: '#F58300' }}
        className={textWeightClass}>
        BTC
      </span>
    </span>
  );
};

export default BTCValue;
