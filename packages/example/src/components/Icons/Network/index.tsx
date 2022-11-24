import React from 'react';
import { BitcoinNetwork } from '../../../interface';

const NetworkIcon = ({network}: { network: BitcoinNetwork }) => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='8' cy='8' r='4' stroke={network === BitcoinNetwork.Main ? '#00B87A' : '#656D85'} strokeWidth='4'/>
  </svg>
);

export default NetworkIcon;
