import React from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useTransaction } from "../../hook/useTransaction";
import { useKeystoneStore } from "../../mobx";

const Aside = () => {
  const { global: { network } } = useKeystoneStore()
  const { txList } = useTransaction(network);

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
