import React from "react";
import { Modal } from 'semantic-ui-react';
import CloseIcon from "../Icons/CloseIcon";
import { ReactComponent as AccountIcon } from "./image/wallet.svg";
import { satoshiToBTC } from "../../lib/helper";
import { useUtxo } from "../../hook/useUtxo";
import { fromHdPathToObj } from "../../lib/cryptoPath";
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
import { BitcoinUnits, isBTC } from "../../lib/unit";
import { Utxo } from "../../interface";

type AccountDetails = {
  close: () => void;
  balance: number;
  unit: BitcoinUnits;
}


type GroupedUtxo = {
  [id:string]: Utxo & {
    count: number;
  }
}

const Details = (({close, balance, unit}: AccountDetails) => {
  const { utxoList } = useUtxo()

  const grouppedUtxos = utxoList.reduce((acc: GroupedUtxo, current: Utxo) => {
    if(acc[current.address]) {
      let newCount = acc[current.address].count + 1;
      let newSum = acc[current.address].value + current.value
      acc[current.address] = {
        ...acc[current.address],
        count: newCount,
        value: newSum
      }
    } else {
      acc[current.address] = {
        ...current,
        count: 1
      }
    }
    return acc
  }, {})

  const switchValue = (value: number) =>
    isBTC(unit) ? satoshiToBTC(value) : value

  return (
    <Modal
      className={'modal-container'}
      open={true}
      style={{ height: 640 }}
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
          <AccountTopUnits>{unit}</AccountTopUnits>
        </AccountDetailHeader>
      </AccountDetailTop>
      <AccountDetailBottom>
        {Object.values(grouppedUtxos).map((item) => {
          return (
            <AccountListItem key={item.address}>
              <AccountListLabel>
                <AccountListLabelTop>{item.path}</AccountListLabelTop>
                <AccountListLabelTop>{switchValue(item.value)}</AccountListLabelTop>
              </AccountListLabel>
              <AccountListLabel>
                <AccountListLabelBottom title={item.address}>
                  {`${item.address.slice(0, 8)}...${item.address.slice(-8)}`}
                </AccountListLabelBottom>
                <AccountListLabelBottom>
                  UTXOs:<span>{item.count}</span>
                </AccountListLabelBottom>
              </AccountListLabel>
            </AccountListItem>
          )
        })}
      </AccountDetailBottom>
    </Modal>
  )
})

export default Details
