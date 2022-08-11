import React from 'react';
import Refresh from "./image/refresh.svg";
import Transactions from "./image/transactions.svg";
import Menu from "../Menu";

const Aside = () => {
  return (
    <div className="Account-Aside">
      <div className="Account-Aside-Container">
        <Menu />
        <div className="Tx-list-container">
          <img src={Transactions} alt="transactions"/>
          <p className="Empty-tip">No Transactions</p>
        </div>
        <div className="Refresh-container">
          <img src={Refresh} alt="Refresh" />
        </div>
      </div>
    </div>
  );
};

export default Aside;
