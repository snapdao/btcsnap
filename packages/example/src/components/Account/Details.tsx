import React from "react";
import { Modal } from 'semantic-ui-react';
import CloseIcon from "../Icons/CloseIcon";
import { ReactComponent as AccountIcon } from "./image/wallet.svg";
import { satoshiToBTC } from "../../lib/helper";
import { bitcoinUnit } from "./Main";
import { BitcoinNetwork } from "../../interface";
import { useUtxo } from "../../hook/useUtxo";
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

type AccountDetails = {
  close: () => void;
  balance: number;
  units: string;
}

const Details = (({close, balance, units}: AccountDetails) => {
  const { utxoList } = useUtxo()

  const switchValue = ((value: number) => {
    if(units === bitcoinUnit[BitcoinNetwork.Main].BTC || units === bitcoinUnit[BitcoinNetwork.Test].BTC) {
      return satoshiToBTC(value);
    } else {
      return value
    }
  })

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
