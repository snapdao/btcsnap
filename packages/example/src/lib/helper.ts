import { Utxo, Address } from '../interface';

type UxtoMap = {
  [address: string]: number;
};

export const countUtxo = (utxos: Utxo[]) => {
  const map: UxtoMap = {};
  utxos.forEach((each) => {
    if (map[each.address]) {
      map[each.address] = map[each.address] + 1;
    } else {
      map[each.address] = 1;
    }
  });

  return map;
};

export const addressAggrator = (
  receiveList: Address[],
  changeList: Address[],
  utxoMap: UxtoMap,
) => {
  const address: { address: string; path: string; count: number }[] = [];
  const allAddress = receiveList.concat(changeList);
  allAddress.forEach((each) => {
    if (each.address) {
      address.push({
        address: each.address,
        path: each.path,
        count: utxoMap[each.address] || 0,
      });
    }
  });
  return address;
};

export const satoshiToBTC = (satoshi: number) => {
  return satoshi / (10 ** 8);
};

export const btcToSatoshi = (btc: number) => {
  return Math.round(btc * (10 ** 8));
};
