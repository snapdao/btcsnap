export interface HdPath {
  purpose: string | null;
  coinType: string | null;
  account: string | null;
  change: string | null;
  index: string | null;
}

export interface LightningPath {
  purpose: {
    value: string;
    isHardened: boolean;
  };
  coinType: {
    value: string;
    isHardened: boolean;
  };
  account: {
    value: string;
    isHardened: boolean;
  };
  change: {
    value: string;
    isHardened: boolean;
  };
  index: {
    value: string;
    isHardened: boolean;
  };
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

export const parseLightningPath = (hdPath: string): LightningPath => {
  const regex = /(\d'?)+/g;
  const numbers = hdPath.match(regex);
  const isHardened = (str:string) => {
    return str.indexOf("'") !== -1
  }

  return {
    purpose: {
      value: numbers && numbers[0],
      isHardened: isHardened(numbers[0])
    },
    coinType: {
      value: numbers && numbers[1],
      isHardened: isHardened(numbers[1])
    },
    account: {
      value: numbers && numbers[2],
      isHardened: isHardened(numbers[2])
    },
    change: {
      value: numbers && numbers[3],
      isHardened: isHardened(numbers[3])
    },
    index: {
      value: numbers && numbers[4],
      isHardened: isHardened(numbers[4])
    },
  };
};
