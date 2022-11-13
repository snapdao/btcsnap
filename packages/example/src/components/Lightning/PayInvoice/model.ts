import React from 'react';
import { makeAutoObservable, reaction } from "mobx";
import lightningPayReq, { PaymentRequestObject } from "bolt11";
import { covertSecondsToHM } from "../../../lib/datetime";
import { SendStatus } from "./types";
import { satoshiToBTC } from "../../../lib/helper";
import { signLNInvoice } from "../../../lib/snap";
import { SnapRequestErrors } from "../../../errors/Snap/errors";
import { payInvoice } from "../../../api/lightning/payInvoice";
import { logger } from "../../../logger";

class LightningSendViewModel {
  public status: SendStatus = SendStatus.Init;
  public isConfirmModalOpen: boolean = false;
  public isPaying: boolean = false;

  public invoice: string = '';
  private decodedInvoice: PaymentRequestObject | null = null;
  public shouldShowInvoiceNotValidError: boolean = false;
  public error: { message: string, code: number, name: string } | undefined = undefined;
  public showMetaMaskTips: boolean = false;

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private expireTotalSeconds: number = 0;

  constructor(
    public balance: number,
    public exchangeRate: number,
  ) {
    makeAutoObservable(this);
    reaction(
      () => this.status,
      (status) => {
        if (status !== SendStatus.Init) {
          this.setIsConfirmModalOpen(false);
        }
      },
    );
  }

  resetState = () => {
  };

  setIsConfirmModalOpen = (flag: boolean) => {
    this.isConfirmModalOpen = flag;
  };

  setInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputInvoice = event.target.value;
    this.invoice = inputInvoice;
    try {
      this.decodedInvoice = lightningPayReq.decode(inputInvoice)
      this.setShouldShowInvoice(false);
      const expireDateTime = new Date((this.decodedInvoice?.timeExpireDate || 0) * 1000)
      this.expireTotalSeconds = Math.floor((expireDateTime.getTime() - new Date().getTime()) / 1000);
      if (this.expireTotalSeconds > 0) {
        this.timerInterval = setInterval(() => {
          this.setExpireTotalSeconds(this.expireTotalSeconds - 1)
        }, 1000);
      }
    } catch (e) {
      this.decodedInvoice = null;
      this.expireTotalSeconds = 0;
      setTimeout(() => {
        this.setShouldShowInvoice(!!inputInvoice)
      }, 500)
    }
  };

  get minFee() {
    return Math.floor(this.amount * 0.003);
  }

  get maxFee() {
    return Math.floor(this.amount * 0.01) + 1;
  }

  get feeRange() {
    return `${this.minFee} - ${this.maxFee}`;
  }

  get isInvoiceValid() {
    return !!this.decodedInvoice;
  }

  get isBalanceEnoughToPay() {
    return this.balance >= (this.amount + this.maxFee);
  }

  get ableToSend() {
    return this.isInvoiceValid && this.isBalanceEnoughToPay && !this.isInvoiceExpired;
  }

  get isInvoiceExpired() {
    return this.expireTotalSeconds < 0;
  }

  get expireTime() {
    if (this.expireTotalSeconds <= 0) {
      return {hours: 0, minutes: 0, seconds: 0}
    }
    return covertSecondsToHM(this.expireTotalSeconds)
  }

  get amount() {
    return this.decodedInvoice?.satoshis || 0
  }

  get amountInCurrency() {
    return (satoshiToBTC(this.amount) * this.exchangeRate).toFixed(2);
  }

  get description() {
    return this.decodedInvoice?.tags.find(tag => tag.tagName === 'description')?.data || ''
  }

  get balanceInCurrency() {
    return this.balance * this.exchangeRate;
  }

  get isRequestDenied() {
    return ['UserReject', 'RejectSign'].includes(this.error?.name || '')
  }

  setStatus(status: SendStatus) {
    this.status = status
  }

  setError(error: { message: string, code: number, name: string } | undefined) {
    this.error = error;
  }

  setShouldShowInvoice(hasError: boolean) {
    this.shouldShowInvoiceNotValidError = hasError;
  }

  setIsPaying(isPaying: boolean) {
    this.isPaying = isPaying;
  }

  setExpireTotalSeconds(expireSeconds: number) {
    this.expireTotalSeconds = expireSeconds
  }

  signInvoice = async () => {
    this.isConfirmModalOpen = false;
    this.showMetaMaskTips = true;
    if (this.invoice) {
      let signature = ''
      try {
        signature = await signLNInvoice(this.invoice) || '';
        this.showMetaMaskTips = false;
      } catch (e: any) {
        this.error = SnapRequestErrors.find(error => error.message === e.message)!;
        this.showMetaMaskTips = false;
      }

      if (signature) {
        try {
          this.setIsPaying(true)
          const payResult = await payInvoice(this.invoice, signature.slice(2));
          this.setStatus(payResult ? SendStatus.Succeed : SendStatus.Failed)
          this.setIsPaying(false)
        } catch (e) {
          this.setStatus(SendStatus.Failed)
          this.setIsPaying(false)
          logger.error(e);
        }
      }
    }
  }
}

export default LightningSendViewModel;