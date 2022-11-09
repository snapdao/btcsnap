import React from 'react';
import { makeAutoObservable, reaction } from "mobx";
import lightningPayReq, { PaymentRequestObject } from "bolt11";
import { covertSecondsToHM } from "../../lib/datetime";
import { SendStatus } from "./types";
import { satoshiToBTC } from "../../lib/helper";

class LightningSendViewModel {
  public status: SendStatus = SendStatus.Init;
  public isConfirmModalOpen: boolean = false;

  public invoice: string = '';
  private decodedInvoice: PaymentRequestObject | null = null;
  public shouldShowInvoiceNotValidError: boolean = false;
  public errorMessage: {message: string, code: number} = {message: '', code: 0};

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private expireTotalSeconds: number = 0;

  constructor(
    public balance: number,
    public feeRange: string,
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

  resetState = () => {};
  
  setIsConfirmModalOpen =  (flag: boolean) => {
    this.isConfirmModalOpen = flag;
  };

  setInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputInvoice = event.target.value;
    this.invoice = inputInvoice;
    try {
      this.decodedInvoice = lightningPayReq.decode(inputInvoice)
      this.shouldShowInvoiceNotValidError = false;
      const expireDateTime = new Date((this.decodedInvoice?.timeExpireDate || 0) * 1000)
      this.expireTotalSeconds = Math.floor((expireDateTime.getTime() - new Date().getTime()) / 1000);
      this.timerInterval = setInterval(() => {this.setExpireTotalSeconds(this.expireTotalSeconds - 1)}, 1000);
    } catch (e) {
      this.decodedInvoice = null;
      this.expireTotalSeconds = 0;
      setTimeout(() => {
        this.shouldShowInvoiceNotValidError = !!inputInvoice
      }, 500)  
    }
  };

  get isInvoiceValid() {
    return !!this.decodedInvoice;
  }

  get expireTime() {
    if(this.expireTotalSeconds <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }
    }
    return covertSecondsToHM(this.expireTotalSeconds)
  }
  
  get amount() {
    return this.decodedInvoice?.satoshis || 0
  }

  get amountInCurrency(){
    return (satoshiToBTC(this.amount) * this.exchangeRate).toFixed(2);
  }

  get description() {
    return this.decodedInvoice?.tags.find(tag => tag.tagName === 'description')?.data || ''
  }
  
  get balanceInCurrency(){
    return this.balance * this.exchangeRate;
  }
  
  setExpireTotalSeconds(expireSeconds: number){
    this.expireTotalSeconds = expireSeconds
  }

  payInvoice() {}
}

export default LightningSendViewModel;
