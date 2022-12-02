import { trackLightningImportSuccess } from './../../../tracking/events/index';
import { ChangeEvent } from 'react';
import { makeAutoObservable } from 'mobx';
import { crypto } from 'bitcoinjs-lib';
import { getLNWalletData, GetLNWalletDataKey } from '../../../lib/snap';
import { importWallet } from '../../../api/lightning/importWallet';
import { createLNWallet } from '../../../services/LightningService/createLightningWallet';
import { logger } from '../../../logger';
import { getAppStore } from '../../../mobx';
import { ILightningWallet } from '../../../mobx/types';

enum ImportWalletResult {
  Init,
  Succeed,
  Failed,
}

const CREDENTIAL_FORMAT = /^lndhub:\/\/([0-9a-f]{20}):([0-9a-f]{20})/;

export class LightningImportWalletModel {
  public credential = '';
  public isImporting = false;
  public importResult: ImportWalletResult = ImportWalletResult.Init;
  public walletName = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isCredentialValid() {
    return CREDENTIAL_FORMAT.test(this.credential);
  }

  get errorTip() {
    if (!this.credential) {
      return '';
    }
    if (!this.isCredentialValid) {
      return 'Invalid Lightning Wallet Key';
    }
    if (this.isWalletExist) {
      return 'Wallet Already Exists';
    }
    return '';
  }

  get isReadyToImport() {
    return this.isCredentialValid && !this.isImporting && !this.isWalletExist;
  }

  get isImportFailed() {
    return this.importResult === ImportWalletResult.Failed;
  }

  get isImportSucceed() {
    return this.importResult === ImportWalletResult.Succeed;
  }

  get loginAndPassword() {
    if (!this.isCredentialValid) {
      return null;
    }
    const [_, login, password] = this.credential.match(CREDENTIAL_FORMAT)!;
    return {
      login,
      password,
    };
  }

  get isWalletExist() {
    if (!this.loginAndPassword) {
      return false;
    } else {
      const { login, password } = this.loginAndPassword;
      const userId = crypto
        .sha256(Buffer.from(`${login}:${password}`))
        .toString('hex');
      const {
        lightning: { getWalletByUserId },
      } = getAppStore();
      return !!getWalletByUserId(userId);
    }
  }

  setCredential(credential: string) {
    this.credential = credential;
  }

  setIsImporting(isImporting: boolean) {
    this.isImporting = isImporting;
  }

  setImportResult(importResult: ImportWalletResult) {
    this.importResult = importResult;
  }

  resetState(){
    this.setCredential('');
    this.setWalletName('');
    this.setImportResult(ImportWalletResult.Init);
  }

  setWalletName(walletName: string) {
    this.walletName = walletName;
  }

  onWalletNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setWalletName(value);
  };

  onCredentialInputChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    this.setCredential(value);
  };

  onCredentialFileChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result) {
          this.setCredential(reader.result.toString());
        }
      });
      reader.readAsText(file);
    }
  };

  importLightningWallet = async (
    applyWallet: (newWallet: ILightningWallet) => void,
  ) => {
    if (!this.loginAndPassword) {
      return;
    }
    this.setImportResult(ImportWalletResult.Init);

    try {
      this.setIsImporting(true);
      const pubkey = await getLNWalletData(GetLNWalletDataKey.PubKey);
      const { login, password } = this.loginAndPassword;
      const { userId, userPassword } = await importWallet(
        pubkey!,
        login,
        password,
      );
      const newWallet = await createLNWallet(
        userId,
        userPassword,
        { login, password },
        this.walletName,
      );
      this.setImportResult(ImportWalletResult.Succeed);
      trackLightningImportSuccess();
      this.setIsImporting(false);
      applyWallet(newWallet);
    } catch (e) {
      this.setImportResult(ImportWalletResult.Failed);
      this.setIsImporting(false);
      logger.error(e);
    }
  };
}
