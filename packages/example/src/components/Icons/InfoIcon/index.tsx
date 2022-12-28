import React from 'react';
import styled from 'styled-components';

const SvgWrapper = styled.svg.attrs({ className: 'icon-info' })`
  path {
    transition: all 0.25s;
  }
`;

const InfoIcon = ({ color = '#C5CAD6', ...args }: {color?: string} ) => (
  <SvgWrapper width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...args}>
    <path fillRule='evenodd' clipRule='evenodd' d='M15 9C15 12.3137 12.3137 15 9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3C12.3137 3 15 5.68629 15 9ZM16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM8.25 6.75V5.25H9.75V6.75H8.25ZM8.25 12.75V8.25H9.75V12.75H8.25Z' fill={color} />
  </SvgWrapper>
);

export default InfoIcon;
