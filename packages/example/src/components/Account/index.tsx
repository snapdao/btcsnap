import React from 'react';
import { observer } from "mobx-react-lite";
import Main from "./Main";
import Aside from "./Aside";
import { useExtendedPubKey } from "../../hook/useExtendedPubKey";
import { addressAggrator, countUtxo, satoshiToBTC } from "../../lib/helper";
import "./Account.css"

const Account = observer(() => {
  const {
    utxoList,
    receiveAddressList,
    changeAddressList,
  } = useExtendedPubKey();

  const utxoMap = countUtxo(utxoList);
  const addresses = addressAggrator(
    receiveAddressList,
    changeAddressList,
    utxoMap,
  );

  const balance = satoshiToBTC(utxoList.reduce((acc, current) => acc + current.value, 0));
  const receiveAddress = addresses.find(address => address.path === "m/1/0")?.address || ""

  return (
    <div className="Account-Background">
      <div className="Account-Container">
        <Main balance={balance} receiveAddress={receiveAddress}/>
        <Aside/>
      </div>
      <p className="Account-Powered-By">Powered by MetaMask Snaps</p>
    </div>
  );
});

export default Account;
