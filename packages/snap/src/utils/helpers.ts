export const satoshiToBTC = (satoshi: number) => {
  return satoshi / (10 ** 8);
};

export const btcToSatoshi = (btc: number) => {
  return Math.round(btc * (10 ** 8));
};
