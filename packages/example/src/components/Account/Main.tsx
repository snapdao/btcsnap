import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import Logo from "./image/logo.svg";
import Send from "./image/send.svg";

const Main = () => {
  return (
    <div className="Account-Main">
      <div className="Account-Main-Container">
        <div className="Logo-container">
          <img src={Logo} alt="BitcoinSnap" className="Logo-img" />
          <span className="Logo-label">Alpha</span>
        </div>
        <div className="Balance-container">
          <p className="Balance-label">current balance</p>
          <p className="Balance">0.0000 BTC</p>
        </div>
        <div>
          <div className="Action-container">
            <div className="Action-button-container">
              <img src={Send} alt="Send" />
            </div>
            <p>send</p>
          </div>
          <div className="Action-container">
            <div className="Action-button-container rotate">
              <img src={Send} alt="Receive" />
            </div>
            <p>receive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
