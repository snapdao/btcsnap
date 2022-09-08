import { Modal } from 'semantic-ui-react';
import CloseIcon from "../Icons/CloseIcon";
import { ReactComponent as AccountIcon } from "./image/wallet.svg";
import {
  AccountDetailTop,
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  AccountDetailHeader,
  AccountTopBalance,
  AccountTopUnits,
  AccountDetailBottom, AccountListItem, AccountListLabel, AccountListLabelTop, AccountListLabelBottom
} from "./styles"
import React, { useEffect, useState } from "react";
import { sendInfo } from "../../api/v1/sendInfo";
import { useKeystoneStore } from "../../mobx";
import { fromHdPathToObj } from "../../lib/cryptoPath";
import { coinManager } from "../../services/CoinManager";
import { satoshiToBTC } from "../../lib/helper";
import { bitcoinUnit } from "./Main";
import { BitcoinNetwork, Utxo } from "../../interface";

interface CountedUtxo extends Utxo {
  count: number;
}

type AccountDetails = {
  open: boolean;
  close: () => void;
  balance: number;
  units: string;
}

const Details = (({open, close, balance, units}: AccountDetails) => {
  const {current} = useKeystoneStore();
  const [utxoList, setUtxoList] = useState<CountedUtxo[]>([]);

  const switchValue = ((value: number) => {
    if(units === bitcoinUnit[BitcoinNetwork.Main].BTC || units === bitcoinUnit[BitcoinNetwork.Test].BTC) {
      return satoshiToBTC(value);
    } else {
      return value
    }
  })

  useEffect(() => {
    if (current && open) {
      sendInfo(current.coinCode).then(data => {
        const utxoList = data.spendables
          .map(utxo => {
            const {change, index} = fromHdPathToObj(utxo.hdPath);
            const pubkey = coinManager.xpubToPubkey(current.xpub, Number(change || 0), Number(index || 0));
            return {
              transactionHash: utxo.txid,
              index: Number(index || 0),
              address: coinManager.deriveAddress(pubkey, current.scriptType, current.network),
              value: utxo.value,
              path: `M/${change}/${index}`,
            }
          }).reduce((acc: CountedUtxo[], cur): CountedUtxo[] => {
            const itemIndex = acc.findIndex(item => item.path === cur.path);
            if (itemIndex > -1) {
              acc[itemIndex].count++;
              acc[itemIndex].value += cur.value;
              return acc;
            } else {
              return [...acc, {...cur, count: 1}]
            }
          }, [])
        setUtxoList(utxoList)
      }).catch(e => {
        console.error("Fetch utxo list failed", e);
      })
    }
  }, [open, current])

  return (
    <Modal
      className={'modal-container'}
      open={open}
      style={{
        height: '640px'
      }}
    >
      <AccountDetailTop>
        <ModalHeader>
          <ModalHeaderContainer>
            <AccountIcon/>
            <ModalHeaderLabel>ACCOUNT</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close}/>
        </ModalHeader>
        <AccountDetailHeader>
          <AccountTopBalance>{balance}</AccountTopBalance>
          <AccountTopUnits>{units}</AccountTopUnits>
        </AccountDetailHeader>
      </AccountDetailTop>
      <AccountDetailBottom>
        {utxoList.map((item) => (
          <AccountListItem key={item.address}>
            <AccountListLabel>
              <AccountListLabelTop>{item.path}</AccountListLabelTop>
              <AccountListLabelTop>{switchValue(item.value)}</AccountListLabelTop>
            </AccountListLabel>
            <AccountListLabel>
              <AccountListLabelBottom title={item.address}>
                {`${item.address.slice(0, 8)}...${item.address.slice(item.address.length - 8)}`}
              </AccountListLabelBottom>
              <AccountListLabelBottom>
                UTXOs:<span>{item.count}</span>
              </AccountListLabelBottom>
            </AccountListLabel>
          </AccountListItem>
        ))}
      </AccountDetailBottom>
    </Modal>
  )
})

export default Details
