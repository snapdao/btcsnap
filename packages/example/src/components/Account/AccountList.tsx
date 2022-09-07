import { useEffect, useState } from "react";
import { AccountListItem, AccountListLabel, AccountListLabelTop, AccountListLabelBottom } from "./styles";
import { satoshiToBTC } from "../../lib/helper"

interface UTXO {
  address: string,
  transactionHash: string,
  index: number,
  value: number,
  rawHex: string
}

interface UTXOWithCount extends UTXO {
  count: number
}

type utxoListProps = {
  utxoList: UTXO[];
  units: string;
}

const AccountList = (({utxoList, units}:utxoListProps) => {
  const [countedUtxo,setCountedUtxo] = useState<UTXOWithCount[]>([])

  useEffect(() => {
    const result = utxoList.reduce((acc: UTXOWithCount[], cur: UTXO): UTXOWithCount[] => {
      const itemIndex = acc.findIndex(item => item.address === cur.address);
      if(itemIndex > -1) {
        acc[itemIndex].count++ ;
        acc[itemIndex].value += cur.value;
        return acc;
      } else {
        return [...acc, {...cur, count: 1}]
      }
    }, [])
    setCountedUtxo(result)
  },[])

  const switchValue = ((value: number) => {
    if(units === 'BTC') {
      return satoshiToBTC(value);
    } else {
      return value
    }
  })

  return (
    <>
      {countedUtxo.map((item: UTXOWithCount) => (
        <AccountListItem key={item.address}>
          <AccountListLabel>
            <AccountListLabelTop>BTC-{item.index} (m/0/{item.index})</AccountListLabelTop>
            <AccountListLabelTop>{switchValue(item.value)}</AccountListLabelTop>
          </AccountListLabel>
          <AccountListLabel>
            <AccountListLabelBottom>{item.address}</AccountListLabelBottom>
            <AccountListLabelBottom>
              UTXOs:<span>{item.count}</span>
            </AccountListLabelBottom>
          </AccountListLabel>
        </AccountListItem>
      ))}
    </>
  )
})

export default AccountList
