import React, { useState, useEffect } from 'react';
import { connect, getExtendedPublicKey, signPsbt } from './lib/snap';
import {
  addressAggrator,
  countUtxo,
  satoshiToBTC,
  btcToSatoshi,
} from './lib/helper';
import { genreatePSBT, getNodeFingerPrint, sendTx } from './lib/index';
import './App.css';
import { PageHeader } from './components/Header';
import { PageFooter } from './components/Footer';
import { Address } from './components/Address';
import SendBox from './components/Send';
import AddressBox from './components/AddressBox';
import Banner from './components/Banner';
import { TransactionList } from './components/TransactionList';
import { useExtendedPubKey } from './hook/useExtendedPubKey';
import { useFeeRate } from './hook/useBitcoinTx';
import { useTransaction } from './hook/useTransaction';
import { BitcoinNetwork } from './interface';
import Account from "./components/Account";
import Connect from "./components/Connect";

function App() {
  const [network, setNetwork] = useState<BitcoinNetwork>(BitcoinNetwork.Test);
  const [target, setTarget] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const { feeRate } = useFeeRate(network);
  const { txList, addTx, refresh } = useTransaction(network);

  const {
    utxoList,
    recieveAddressList,
    changeAddressList,
    setPubKey,
    loading,
    pubKey,
  } = useExtendedPubKey('', network);

  const utxoMap = countUtxo(utxoList);
  const address = addressAggrator(
    recieveAddressList,
    changeAddressList,
    utxoMap,
  );

  const onSendClick = async () => {
    try {
      const psbt = genreatePSBT(
        { address: target, value: btcToSatoshi(value) },
        utxoList,
        feeRate,
        {
          addressList: recieveAddressList.concat(changeAddressList),
          masterFingerprint: getNodeFingerPrint(pubKey),
          changeAddress:
            changeAddressList[changeAddressList.length - 1].address,
        },
        network,
      );
      const { txId, txHex } = await signPsbt(psbt.toBase64(), network);
      await sendTx(txHex, network);
      addTx(txId);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  const lastReceiveAddress =
    recieveAddressList.length > 0
      ? recieveAddressList[recieveAddressList.length - 1]
      : undefined;

  const balance = satoshiToBTC(
    utxoList.reduce((acc, current) => acc + current.value, 0),
  )

  return (
    <>
      <Connect
        network={network}
        onXpubRevealed={setPubKey}
      />
      <Account
        balance={balance}
        address={address?.[0]?.address || ""}
        txList={txList}
      />
    </>
  );
}

export default App;
