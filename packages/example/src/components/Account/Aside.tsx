import React from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";

export interface AsideProps {
  txList: any[]
}

const Aside = ({txList}: AsideProps) => {
  return (
    <div className="Account-Aside">
      <div className="Account-Aside-Container">
        <Menu />
        <TxList txList={txList} />
        <RefreshIcon />
      </div>
    </div>
  );
};

export default Aside;
