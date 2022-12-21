import { useState, useEffect } from 'react';
import { queryFeeRate } from '../api/v1/feeRate';
import { useAppStore } from '../mobx';
import { FeeRate } from '../components/SendModal/types';

const initFeeRate: FeeRate = {
  high: 0,
  recommended: 0,
  low: 0
};

export const useFeeRate = () => {
  const { current } = useAppStore();
  const [feeRate, setFeeRate] = useState<FeeRate>(initFeeRate);
  const [count, setCount] = useState(0);

  const refresh = () => setCount(count + 1);

  useEffect(() => {
    if (current) {
      queryFeeRate(current.coinCode).then((res) => {
        const feeRate = res.feeEstimation.feeRate;
        setFeeRate({
          low: Math.round(Number(feeRate['70']) / 1024),
          recommended: Math.round(Number(feeRate['60']) / 1024),
          high: Math.round(Number(feeRate['30']) / 1024),
        });
      });
    }
  }, [current, count]);

  return {
    feeRate,
    refresh
  };
};
  