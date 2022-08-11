import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import "./Account.css"
import Main from "./Main";
import Aside from "./Aside";

const Account = () => {
  return (
    <div className="Account-Background">
      <div className="Account-Container">
        <Main />
        <Aside />
      </div>
      <p className="Account-Powered-By">Powered by MetaMask Snaps</p>
    </div>
  );
};

export default Account;
