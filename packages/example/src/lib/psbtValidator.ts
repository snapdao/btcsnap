import { Psbt } from "bitcoinjs-lib";
import { getKeystoneStore } from "../mobx";
import { coinManager } from "../services/CoinManager";
import { fromHdPathToObj } from "./cryptoPath";

const MAX_FEE = 0.1 * 100000000;
const DUST_THRESHOLD = 546;

interface ValidateTxData {
  psbt: Psbt;
  utxoAmount: number;
  changeAddressPath: string;
  to: string;
}

export const validateTx = ({psbt, utxoAmount, changeAddressPath, to}: ValidateTxData) => {
  return isChangeAddressBelongsToCurrentAccount(psbt, changeAddressPath, to) &&
    !isFeeTooHigh(psbt, utxoAmount) &&
    !hasDustOutput(psbt)
}

const isFeeTooHigh = (psbt: Psbt, utxoAmount: number) => {
  const outputAmount = psbt.txOutputs.reduce((amount,output) => amount + output.value, 0);
  const fee = utxoAmount - outputAmount;
  return fee >= MAX_FEE
}

const isChangeAddressBelongsToCurrentAccount = (psbt: Psbt, changeAddressPath: string, to: string) => {
  const changeAddress = psbt.txOutputs.find(output => output.address !== to);
  const {current} = getKeystoneStore();
  if(current) {
    // changeAddress exists
    if (changeAddress) {
      const {xpub, scriptType, network} = current;
      const address = changeAddress.address;
      const [change, index] = parseRelativeHDPath(changeAddressPath)
      const pubkey = coinManager.xpubToPubkey(xpub, Number(change), Number(index));
      console.log(coinManager.deriveAddress(pubkey, scriptType, network))
      return address === coinManager.deriveAddress(pubkey, scriptType, network);
    }
    return true
  }

  return false;
}

const hasDustOutput = (psbt: Psbt) => {
  return !!psbt.txOutputs.find(output => output.value <= DUST_THRESHOLD);
}


 const parseRelativeHDPath = (hdPath: string) => {
  const regex = /(\d)+/g;
  const numbers = hdPath.match(regex);
  return numbers || [];
};

