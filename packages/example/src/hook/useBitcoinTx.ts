import { useState, useEffect } from 'react';

import { BitcoinNetwork  } from '../interface';
import { BlockChair } from '../lib/explorer';
import { BACKENDAPI } from '../config'

export const useFeeRate = (network: BitcoinNetwork) => {
    const [feeRate, setFeeRate] = useState(0);
    const [count, setCount] = useState(0)
    
    const refresh = () => setCount(count + 1);;
  
    useEffect(() => {
        const apiKey = BACKENDAPI;
        const explorer = new BlockChair(apiKey, network);
        
        explorer.getSuggestFeeRate().then(setFeeRate)
    }, [network]);
  
    return {
        feeRate,
        refresh
    };
  };
  