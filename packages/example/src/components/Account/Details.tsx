import React, { useState } from 'react';
import { Modal, TransitionablePortal } from 'semantic-ui-react';
import CloseIcon from '../Icons/CloseIcon';
import LoadingIcon from '../Icons/Loading';
import { ReactComponent as AccountIcon } from './image/wallet.svg';
import { satoshiToBTC } from '../../lib/helper';
import { useUtxo } from '../../hook/useUtxo';
import { fromHdPathToObj } from '../../lib/cryptoPath';
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
} from './styles';
import { BitcoinUnits, isBTC } from '../../lib/unit';
import { Utxo } from '../../interface';

type AccountDetails = {
  open: boolean;
  close: () => void;
  balance: number;
  unit: BitcoinUnits;
}


type GroupedUtxo = {
  [id:string]: Utxo & {
    count: number;
  }
}

const Details = (({ open, close, balance, unit }: AccountDetails) => {
  const { utxoList, loading } = useUtxo();
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const grouppedUtxos = utxoList.reduce((acc: GroupedUtxo, current: Utxo) => {
    if(acc[current.address]) {
      const newCount = acc[current.address].count + 1;
      const newSum = acc[current.address].value + current.value;
      acc[current.address] = {
        ...acc[current.address],
        count: newCount,
        value: newSum
      };
    } else {
      acc[current.address] = {
        ...current,
        count: 1
      };
    }
    return acc;
  }, {});

  const switchValue = (value: number) =>
    isBTC(unit) ? satoshiToBTC(value) : value;

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
            Object.values(grouppedUtxos).map((item) => {
              const { change, index } = fromHdPathToObj(item.path!);
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
              );
            })
          }
        </AccountDetailBottom>
      </Modal>
    </TransitionablePortal>
  );
});

export default Details;
