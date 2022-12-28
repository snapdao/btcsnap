import mixpanel from 'mixpanel-browser';
import { ENVIRONMENT, TRACK_TOKEN, VERSION } from '../config';
import { EVENTS } from './events/types';
import { trackPageView } from './events';
export * from './events';

export const CONTEXT = {
  version: VERSION,
  env: ENVIRONMENT,
};

export const trackInit = () => {
  const trackToken = TRACK_TOKEN;
  if (!trackToken) {
    console.error('[mixpanel] init error, token not found');
    return;
  }
  const isNonProd = ENVIRONMENT !== 'production';
  mixpanel.init(trackToken, {
    debug: isNonProd,
    loaded: () => {
      trackPageView();
    },
  });
};

export const trackEvent = (event: EVENTS, data = {}) => {
  mixpanel.track(event, {
    ...data,
    ...CONTEXT,
  });
};
