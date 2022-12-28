import { ComponentPropsWithoutRef } from 'react';
import { Line } from './styles';

export interface Props extends ComponentPropsWithoutRef<'div'>{
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  color?: string;
}

export default function Divider({
  direction = 'horizontal',
  gap = '8px',
  color = 'var(--c-ntd04)',
  ...args
}: Props) {
  return <Line direction={direction} gap={gap} color={color} {...args} />;
}
