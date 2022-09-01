import React, { useCallback, useEffect, useState } from 'react';
import {observer} from 'mobx-react-lite';

import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork, Utxo } from "../../interface";
import SendModal from '../SendModal';
import ReceiveModal from '../ReceiveModal'
import AccountDetail from './Details';
import {
  AccountMain,
  LogoContainer,
  LogoLabel,
  BalanceContainer,
  BalanceLabel,
  BalacneLeftItem,
  BalacneLeftLabel,
  BalacneLeftArrow,
  BalacneRightItem,
  BalacneRightLine,
  BalacneRightLabel,
  ActionContainer,
  ActionContainerItem,
  ActionLabel,
  ActionButton
} from './styles'

import { ReactComponent as Logo } from "./image/logo.svg";
import { ReactComponent as LogoTestnet } from "./image/logo-testnet.svg";
import { SendInfo } from "../../lib";
import ReceiveIcon from "../Icons/ReceiveIcon";
import ArrowRight from "../Icons/ArrowRight"


export interface MainProps {
  balance: number
  receiveAddress: string
  utxos: Utxo[],
  sendInfo?: SendInfo,
}

const utxoList = [
  {
    "address": "moQgzAff6d9nfTo4rDGycaJzMfcwj1oyyW",
    "transactionHash": "f22633fc6039ff3cb3f2a7d7e0f61f150e0867150c1e9383f8be278a5349c91a",
    "index": 1,
    "value": 3421682,
    "rawHex": "0200000001d3ef259f2c6e13a937f1108f7d93e77baaadf7a7d21a9ab958ae4398821290aa010000006a47304402202eb2f855b7a6615018915fdf4ea0d143e17adb87596c5de2d88b425c3a62996702205dcbcfaa9598c69293d029dc8ddb2adcc6fab841802dbcd7a6207f932bdbbcb0012103ad69c2323567705cd77b71f785cb44a51762976860edc899334d028ecb566676ffffffff0210270000000000001976a914bc489a78c7bbcd1f4230418c086f6274d09afdc388acf2353400000000001976a9145691bb50b4299e144e7bcc15546617a6e0fd356a88ac00000000"
  },
  {
    "address": "moQgzAff6d9nfTo4rDGycaJzMfcwj1oyyW",
    "transactionHash": "f22633fc6039ff3cb3f2a7d7e0f61f150e0867150c1e9383f8be278a5349c91a",
    "index": 1,
    "value": 1,
    "rawHex": "0200000001d3ef259f2c6e13a937f1108f7d93e77baaadf7a7d21a9ab958ae4398821290aa010000006a47304402202eb2f855b7a6615018915fdf4ea0d143e17adb87596c5de2d88b425c3a62996702205dcbcfaa9598c69293d029dc8ddb2adcc6fab841802dbcd7a6207f932bdbbcb0012103ad69c2323567705cd77b71f785cb44a51762976860edc899334d028ecb566676ffffffff0210270000000000001976a914bc489a78c7bbcd1f4230418c086f6274d09afdc388acf2353400000000001976a9145691bb50b4299e144e7bcc15546617a6e0fd356a88ac00000000"
  },
  {
    "address": "123123123123123123132123",
    "transactionHash": "f22633fc6039ff3cb3f2a7d7e0f61f150e0867150c1e9383f8be278a5349c91a",
    "index": 2,
    "value": 3421682,
    "rawHex": "0200000001d3ef259f2c6e13a937f1108f7d93e77baaadf7a7d21a9ab958ae4398821290aa010000006a47304402202eb2f855b7a6615018915fdf4ea0d143e17adb87596c5de2d88b425c3a62996702205dcbcfaa9598c69293d029dc8ddb2adcc6fab841802dbcd7a6207f932bdbbcb0012103ad69c2323567705cd77b71f785cb44a51762976860edc899334d028ecb566676ffffffff0210270000000000001976a914bc489a78c7bbcd1f4230418c086f6274d09afdc388acf2353400000000001976a9145691bb50b4299e144e7bcc15546617a6e0fd356a88ac00000000"
  }
]

const Main = observer(({balance, receiveAddress, utxos, sendInfo}: MainProps) => {
  const { global: { network }} = useKeystoneStore();
  const [showReceiveModal, setShowReceiveModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [currencyUnit, setCurrencyUnit] = useState<'BTC' | 'Sats'>('BTC');
  const [unitsRight, setUnitsRight] = useState('Sats');

  const onReceive = useCallback(() => {
    setShowReceiveModal(true)
  }, [setShowReceiveModal]);

  const closeReceiveModal = useCallback(() => {
    setShowReceiveModal(false)
  }, [setShowReceiveModal]);

  const onDetail = useCallback(() => {
    setShowDetailModal(true)
  }, [setShowDetailModal])

  const closeDetailModal = useCallback(() => {
    setShowDetailModal(false);
  }, [setShowDetailModal])

  const getCurrentBalance = () => {
    switch (currencyUnit) {
      case 'Sats':
        return balance * 100000000;
      default:
        return balance
    }
  }

  const switchUnits = (() => {
    if(currencyUnit === 'BTC') {
      setCurrencyUnit('Sats');
      setUnitsRight('BTC');
    } else {
      setCurrencyUnit('BTC');
      setUnitsRight('Sats');
    }
  })

  return (
    <AccountMain>
      <LogoContainer>
        {network === BitcoinNetwork.Main
          ? <Logo />
          : <LogoTestnet />
        }
        <LogoLabel>Alpha</LogoLabel>
      </LogoContainer>

      <BalanceContainer>
        <BalanceLabel>current balance</BalanceLabel>
        <BalacneLeftItem>
          <BalacneLeftLabel onClick={onDetail}>
            {getCurrentBalance()} {currencyUnit}
          </BalacneLeftLabel>
          <BalacneLeftArrow><ArrowRight size={25}/></BalacneLeftArrow>
        </BalacneLeftItem>
        <BalacneRightItem>
          <BalacneRightLine>/</BalacneRightLine>
          <BalacneRightLabel onClick={switchUnits}>{unitsRight}</BalacneRightLabel>
        </BalacneRightItem>
      </BalanceContainer>

      <ActionContainer>
        <ActionContainerItem>
          <SendModal network={network} utxos={utxos} sendInfo={sendInfo} />
          <ActionLabel>send</ActionLabel>
        </ActionContainerItem>
        <ActionContainerItem onClick={onReceive}>
          <ActionButton>
            <ReceiveIcon size={48} />
          </ActionButton>
          <ActionLabel>receive</ActionLabel>
        </ActionContainerItem>
      </ActionContainer>

      <ReceiveModal address={receiveAddress} open={showReceiveModal} close={closeReceiveModal}/>
      <AccountDetail balance={getCurrentBalance()} units={currencyUnit} utxoList={utxoList} open={showDetailModal} close={closeDetailModal} />
    </AccountMain>
  );
});

export default Main;
