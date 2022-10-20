import mixpanel from 'mixpanel-browser';
import { ENVIRONMENT, TRACK_TOKEN, VERSION } from "../config"
import { EVENTS } from "./events/types";
import { trackPageView } from "./events";
export * from "./events"

export const CONTEXT = {
  version: VERSION,
  env: ENVIRONMENT,
}

export const trackInit = () => {
  const trackToken = TRACK_TOKEN;
  const isNonProd = ENVIRONMENT !== "production";

  mixpanel.init(trackToken, {
    debug: isNonProd,
    loaded: () => {
      trackPageView()
    }
  });
}

export const trackEvent = (event: EVENTS, data = {}) => {
  mixpanel.track(event, {
    ...data,
    ...CONTEXT
  })
}
