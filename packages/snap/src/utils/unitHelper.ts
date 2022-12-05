import BN from 'bn.js';
import { SnapError, InvoiceErrors } from '../errors';

const SATS_PER_BTC = new BN(1e8, 10);

type BitcoinDivisor  = 'm' | 'u' | 'n' | 'p';

const DIVISORS: Record<BitcoinDivisor, BN> = {
  m: new BN(1e3, 10),
  u: new BN(1e6, 10),
  n: new BN(1e9, 10),
  p: new BN(1e12, 10)
};

export const hrpToSatoshi = (hrp: string):string => {
  let divisor, value;
  if (hrp.slice(-1).match(/^[munp]$/)) {
    divisor = hrp.slice(-1);
    value = hrp.slice(0, -1);
  } else if (hrp.slice(-1).match(/^[^munp0-9]$/)) {
    throw SnapError.of(InvoiceErrors.AmountNotValid);
  } else {
    value = hrp;
  }

  if (!value.match(/^\d+$/)){
    throw SnapError.of(InvoiceErrors.AmountNotValid);
  }

  const valueBN = new BN(value, 10);
  const satoshisBN = divisor
    ? valueBN.mul(SATS_PER_BTC).div(DIVISORS[divisor as BitcoinDivisor])
    : valueBN.mul(SATS_PER_BTC);

  return satoshisBN.toString();
};
