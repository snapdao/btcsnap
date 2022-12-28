import { SnapError } from '../errors';
import { getAppStore } from './../mobx/index';
export const satoshiToBTC = (satoshi: number): number => {
  return satoshi / (10 ** 8);
};

export const btcToSatoshi = (btc: number): number => {
  return Math.round(btc * (10 ** 8));
};

export const isBrowserSupport = (ua: string) => {
  let browser = '';
  if (ua.includes('Firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('SamsungBrowser')) {
    browser = 'SamsungBrowser';
  } else if (ua.includes('Opera') || ua.includes('OPR')) {
    browser = 'Opera';
  } else if (ua.includes('Trident')) {
    browser = 'IE';
  } else if (ua.includes('Edge')) {
    browser = 'Edge (Legacy)';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
  } else if (ua.includes('Chrome')) {
    browser = 'Chrome';
  } else if (ua.includes('Safari')) {
    browser = 'Safari';
  }
  return /^(Chrome|Firefox)/.test(browser);
};

export const isFirefox = (ua: string) => ua.includes('Firefox');

