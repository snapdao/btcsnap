import React, { useState } from "react";
import { Modal, TransitionablePortal } from 'semantic-ui-react';
import CloseIcon from "../Icons/CloseIcon";
import LoadingIcon from "../Icons/Loading";
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
  AccountDetailBottom,
  AccountListItem,
  AccountListLabel,
  AccountListLabelTop,
  AccountListLabelBottom,
  LoadingContainer
} from "./styles"
import { BitcoinUnits, isBTC } from "../../lib/unit";

type AccountDetails = {
  open: boolean;
  close: () => void;
  balance: number;
  unit: BitcoinUnits;
}

const Details = (({open, close, balance, unit}: AccountDetails) => {
  const [isOpen,setIsOpen] = useState<boolean>(open);
  const {utxoList, loading} = useUtxo();

  const switchValue = (value: number) =>
    isBTC(unit) ? satoshiToBTC(value) : value

  return (
    <TransitionablePortal
      open={isOpen}
      onClose={close}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        className={'modal-container'}
        open={true}
        style={{ height: 640 }}
      >
        <AccountDetailTop>
          <ModalHeader>
            <ModalHeaderContainer>
              <AccountIcon/>
              <ModalHeaderLabel>account</ModalHeaderLabel>
            </ModalHeaderContainer>
            <CloseIcon onClick={() => setIsOpen(false)}/>
          </ModalHeader>
          <AccountDetailHeader>
            <AccountTopBalance>{balance}</AccountTopBalance>
            <AccountTopUnits>{unit}</AccountTopUnits>
          </AccountDetailHeader>
        </AccountDetailTop>

        <AccountDetailBottom>
          {loading ?
            <LoadingContainer><LoadingIcon /></LoadingContainer> :
            utxoList.map((item) => {
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
            })
          }
        </AccountDetailBottom>
      </Modal>
    </TransitionablePortal>
  )
})

export default Details
