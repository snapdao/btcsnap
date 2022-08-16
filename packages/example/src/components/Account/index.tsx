import React from 'react';
import Main, { MainProps } from "./Main";
import Aside, { AsideProps } from "./Aside";
import "./Account.css"

type AccountProps = MainProps & AsideProps

const Account = ({balance, address, txList}: AccountProps) => {
  return (
    <div className="Account-Background">
      <div className="Account-Container">
        <Main balance={balance} address={address} />
        <Aside txList={txList} />
      </div>
      <p className="Account-Powered-By">Powered by MetaMask Snaps</p>
    </div>
  );
};

export default Account;
