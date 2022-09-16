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

type AccountDetails = {
  close: () => void;
  balance: number;
  unit: BitcoinUnits;
}

const Details = (({close, balance, unit}: AccountDetails) => {
  const { utxoList } = useUtxo()

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
        {utxoList.map((item) => {
          const {change, index} = fromHdPathToObj(item.path!);
          return (
            <AccountListItem key={item.address}>
              <AccountListLabel>
                <AccountListLabelTop>{`M/${change}/${index}`}</AccountListLabelTop>
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
