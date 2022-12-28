import React, { FunctionComponent } from 'react';

type BTCValueProps = {
  value: string;
  size: 'large' | 'normal';
  fontWeight: 'bold' | 'normal';
  unit: string
};

const BTCValue: FunctionComponent<BTCValueProps> = ({
  value,
  size,
  fontWeight,
  unit
}) => {
  const textSizeClass = `text-size-${size}`;
  const textWeightClass = `text-weight-${fontWeight}`;
  const textClass = `${textSizeClass} ${textWeightClass}`;
  return value ? (
    <span className={'btcValue-span'}>
      <span className={textClass} style={{ display: 'inline-block' }}>{value}</span>
      <span
        style={{ fontSize: 16, marginLeft: 4, color: '#F58300', display: 'inline-block' }}
        className={textWeightClass}>
        {unit}
      </span>
    </span>
  ) : null;
};

export default BTCValue;
