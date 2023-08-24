import React from 'react';
import { AnchorContainer } from './styles';
import ArrowRight from '../../components/Icons/ArrowRight';
import { H4 } from '../Layout/Text';

export const Link = ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <AnchorContainer
      target='_blank'
      rel='noopener noreferrer'
      {...rest}
    >
      <H4>
        {children}
      </H4>
      <div>
        <ArrowRight size={18}/>
      </div>
    </AnchorContainer>
  );
};
