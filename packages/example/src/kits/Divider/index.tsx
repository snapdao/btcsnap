import React from 'react';
import { Line } from './styles';

export interface Props {
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  color?: string;
}

export default function Divider({
  direction = 'vertical',
  gap = '8px',
  color = 'var(--c-ntd04)',
  ...args
}: Props) {
  return <Line direction={direction} gap={gap} color={color} {...args} />;
}
