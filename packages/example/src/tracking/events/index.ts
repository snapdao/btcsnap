import { trackEvent } from '../index';
import { EVENTS } from './types';
import { BitcoinNetwork } from '../../interface';

export const trackPageView = () => {
  trackEvent(EVENTS.PageView);
};

export const trackConnectClick = () => {
  trackEvent(EVENTS.ConnectClick);
};

export const trackConnectSucceed = () => {
  trackEvent(EVENTS.ConnectSucceed);
};

export const trackGetAddress = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.ConnectGetAddress, {
    network,
  });
};

export const trackSendClick = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendClick, {
    network,
  });
};

export const trackSendConfirm = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendConfirm, {
    network,
  });
};

export const trackSendSign = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendSign, {
    network,
  });
};

export const trackTransactionBroadcast = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.TransactionBroadcast, {
    network,
  });
};

export const trackTransactionBroadcastSucceed = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.TransactionBroadcastSucceed, {
    network,
  });
};

export const trackLightningSetup = (action: 'create' | 'skip') => {
  trackEvent(EVENTS.LightningSetup, {
    action,
  });
};

export const trackLightningAddSuccess = () => {
  trackEvent(EVENTS.LightningAddSuccess);
};

export const trackLightningWalletAmount = (amount: number) => {
  trackEvent(EVENTS.LightningWalletAmount, {
    amount
  });
};

export const trackLightningImportSuccess = () => {
  trackEvent(EVENTS.LightningImportSuccess);
};

export interface TrackLightningReceiveProps {
  step: 'entry' | 'create' | 'result'
  value?: 'success' | 'failed'
}

export const trackLightningReceive = (props: TrackLightningReceiveProps) => {
  trackEvent(EVENTS.LightningReceive, props);
};

export interface TrackLightningSendProps {
  step: 'entry' | 'create' | 'confirm' | 'result'
  value?: 'success' | 'failed'
}

export const trackLightningSend = (props: TrackLightningSendProps) => {
  trackEvent(EVENTS.LightningSend, props);
};

export interface TrackTopUp {
  type: 'bitcoin' | 'lightning'
  lightningType?: 'internal' | 'external'
  step: 'entry' | 'create' | 'confirm' | 'close' | 'result'
  value?: 'success' | 'failed'
}

export const trackTopUp = (props: TrackTopUp) => {
  trackEvent(EVENTS.TopUp, props);
};

export const trackTransactionButton = (action: 'all' | 'refresh') => {
  trackEvent(EVENTS.TransactionButton, {
    action
  });
};

export interface TrackLightningBackupWalletProps {
  entry: 'create' | 'settings'
  action: 'copy' | 'download'
}

export const trackLightningBackupWallet = (props: TrackLightningBackupWalletProps) => {
  trackEvent(EVENTS.LightningBackupWallet, props);
};
