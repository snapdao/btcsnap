import React from 'react';
import Menu from "./image/menu.svg";
import Refresh from "./image/refresh.svg";
import Transactions from "./image/transactions.svg";

const Aside = () => {
  return (
    <div className="Account-Aside">
      <div className="Account-Aside-Container">
        <div className="Menu-button">
          <img src={Menu} alt="Menu" />
        </div>
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
