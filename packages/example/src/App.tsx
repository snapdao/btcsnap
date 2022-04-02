import React, { useState, useEffect } from 'react';
import { connect, getExtendedPublicKey } from './lib/snap';
import { addressAggrator, countUtxo } from './lib/helper';
import './App.css';
import { PageHeader } from './components/Header';
import { Address } from './components/Address';
import { useExtendedPubKey } from './hook/useExtendedPubKey';
import { BitcoinNetwork } from './interface';

function App() {
  const [connected, setConnectStatus] = useState(false);
  // const [pubKey, setPubKey] = useState('');
  const [network, setNetwork] = useState<BitcoinNetwork>(BitcoinNetwork.Test);

  const connectCallback = () => setConnectStatus(true);

  const {
    utxoList,
    recieveAddressList,
    changeAddressList,
    setPubKey,
    loading,
  } = useExtendedPubKey('', network);
  
  

  const utxoMap = countUtxo(utxoList);
  const address = addressAggrator(
    recieveAddressList,
    changeAddressList,
    utxoMap,
  );

  console.log('utxo:', utxoList);
  console.log('rlist:', recieveAddressList);
  console.log('clist', changeAddressList);

  return (
    <div className="App">
      <PageHeader
        connected={connected}
        onConnect={() => connect(connectCallback)}
      />
      <Address
        onGetPubkey={() => getExtendedPublicKey(network, setPubKey)}
        network={network}
        setNetwork={setNetwork}
        items={address}
        loading={loading}
      />
    </div>
  );
}

export default App;
