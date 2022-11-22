import React, { useState } from "react";
import { ReactComponent as TransactionsIcon } from "./image/transactions.svg";
import { observer } from "mobx-react-lite";
import { TxListContainer, TxListContent, TxListEmpty, EmptyTip } from "./styles";
import { useAppStore } from "../../mobx";
import InfoIcon from "../Icons/InfoIcon";
import { HistoryRecord } from "../../types";
import { RecordDetail } from "../TransactionList/RecordDetail";
import { Popup } from "../../kits";
import { WalletType } from "../../interface";
import { RecordCard } from "../TransactionList/RecordCard";

interface TxCardProps {
  historyList: HistoryRecord[];
}

const TRANSACTION_TIPS = "The previous transactions of addresses before using BitcoinSnap will not be displayed here."

export const LatestRecords = observer(({historyList}: TxCardProps) => {
  const {currentWalletType} = useAppStore();
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);

  const recordList = [...historyList];
  recordList.sort((tx1, tx2) => tx2.datetime - tx1.datetime);

  return (
    <TxListContainer>
      {
        recordList.length > 0 ? (
          <TxListContent>
            {recordList.map(record =>
              <RecordCard
                key={`${record.id}-${record.title}`}
                record={record}
                onClick={() => setSelectedRecord(record)}
              />
            )}
          </TxListContent>
        ) : (
          <TxListEmpty>
            <TransactionsIcon/>
            <EmptyTip>
              <span>no transactions</span>
              {
                currentWalletType === WalletType.BitcoinWallet &&
                  <Popup
                      trigger={<div><InfoIcon/></div>}
                      content={TRANSACTION_TIPS}
                      style={{width: '296px'}}
                  />
              }
            </EmptyTip>
          </TxListEmpty>
        )
      }
      {!!selectedRecord && (
        <RecordDetail
          open={!!selectedRecord}
          close={() => setSelectedRecord(null)}
          record={selectedRecord}
        />
      )}
    </TxListContainer>
  )
})
