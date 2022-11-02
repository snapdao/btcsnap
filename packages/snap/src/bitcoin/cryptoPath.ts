export interface HdPath {
  purpose: string | null;
  coinType: string | null;
  account: string | null;
  change: string | null;
  index: string | null;
}

export const fromHdPathToObj = (hdPath: string): HdPath => {
  const regex = /(\d)+/g;
  const numbers = hdPath.match(regex);
  return {
    purpose: numbers && numbers[0],
    coinType: numbers && numbers[1],
    account: numbers && numbers[2],
    change: numbers && numbers[3],
    index: numbers && numbers[4],
  };
};
