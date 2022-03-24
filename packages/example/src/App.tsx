import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useExtendedPubKey } from './hook/useExtendedPubKey'
import { BitcoinNetwork } from './interface';

function App() {
  const {
    utxoList,
    recieveAddressList,
    changeAddressList,
    setPubKey
  } = useExtendedPubKey("tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB", BitcoinNetwork.Test)
  

  console.log('utxo:', utxoList);
  console.log('rlist:', recieveAddressList);
  console.log('clist', changeAddressList);
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
