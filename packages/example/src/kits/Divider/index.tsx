import React from 'react';
import { Box } from './styles';

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
  return <Box direction={direction} gap={gap} color={color} {...args} />;
}
