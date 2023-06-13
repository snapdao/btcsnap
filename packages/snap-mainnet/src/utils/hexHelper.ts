export const trimHexPrefix = (key: string) => key.startsWith('0x') ? key.substring(2) : key;
