import { trackEvent } from "../index";
import { EVENTS } from "./types";
import { BitcoinNetwork } from "../../interface";

export const trackPageView = () => {
  trackEvent(EVENTS.PageView)
}

export const trackConnectClick = () => {
  trackEvent(EVENTS.ConnectClick)
}

export const trackConnectSucceed = () => {
  trackEvent(EVENTS.ConnectSucceed)
}

export const trackGetAddress = () => {
  trackEvent(EVENTS.ConnectGetAddress)
}

export const trackSendClick = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendClick, {
    network,
  })
}

export const trackSendConfirm = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendConfirm, {
    network,
  })
}

export const trackSendSign = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.SendSign, {
    network,
  })
}

export const trackTransactionBroadcast = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.TransactionBroadcast, {
    network,
  })
}

export const trackTransactionBroadcastSucceed = (network: BitcoinNetwork) => {
  trackEvent(EVENTS.TransactionBroadcastSucceed, {
    network,
  })
}
