import { makeAutoObservable } from "mobx";
import { getLNWalletData, KeyOptions } from "../../../lib/snap";
import { importWallet } from "../../../api/lightning/importWallet";
import { createLNWallet } from "../../../services/LightningService/createLightningWallet";
import { logger } from "../../../logger";

enum ImportWalletResult {
  Init,
  Succeed,
  Failed
}

const CREDENTIAL_FORMAT = /^lndhub:\/\/([0-9a-f]{20}):([0-9a-f]{20})/

export class LightningImportWalletModel {
  public credential: string = '';
  public isImporting: boolean = false;
  public importResult: ImportWalletResult = ImportWalletResult.Init

  constructor() {
    makeAutoObservable(this);
  }

  get isCredentialValid() {
    return CREDENTIAL_FORMAT.test(this.credential);
  }

  get isReadyToImport() {
    return this.isCredentialValid && !this.isImporting;
  }
  
  get isImportFailed() {
    return this.importResult === ImportWalletResult.Failed;
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

  onCredentialInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    this.setCredential(value);
  }

  onCredentialFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result) {
          this.setCredential(reader.result.toString());
        }
      });
      reader.readAsText(file)
    }
  }

  importLightningWallet = async () => {
    if (!this.isCredentialValid) {
      return;
    }
    const [_, login, password] = this.credential.match(CREDENTIAL_FORMAT)!;

    try {
      this.setIsImporting(true);
      const pubkey = await getLNWalletData(KeyOptions.PubKey);
      const {userId, userPassword} = await importWallet(pubkey!, login, password);
      const newWallet = createLNWallet(userId, userPassword, {login, password})
      this.setImportResult(ImportWalletResult.Succeed);
      this.setIsImporting(false);
      return newWallet;
    } catch (e) {
      this.setImportResult(ImportWalletResult.Failed);
      this.setIsImporting(false);
      logger.error(e)
    }
  }
}
