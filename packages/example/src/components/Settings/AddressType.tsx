import React, { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react"
import { TransitionablePortal } from "semantic-ui-react";
import { BitcoinScriptType } from "../../interface";
import CloseIcon from "../Icons/CloseIcon";
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  AddressContainer,
  AddressItem,
  AddressItemLabel,
  AddressItemRadio,
  AddressTips,
} from "./styles"
import { useKeystoneStore } from "../../mobx";
import { queryCoinV2 } from "../../api";
import { NETWORK_SCRIPT_TO_COIN } from "../../constant/bitcoin";
import { satoshiToBTC } from "../../lib/helper";
import { SupportedCoins } from "../../constant/supportedCoins";
import { bitcoinUnitMap } from "../../lib/unit";


interface ConnectProps {
  open: boolean;
  close: () => void;
}

interface AddressType {
  label: string;
  type: BitcoinScriptType;
}

export const addressTypeOptions: AddressType[] = [
  {label: 'HD Native SegWit (Bech32)', type: BitcoinScriptType.P2WPKH},
  {label: 'HD Nested SegWit (P2SH)', type: BitcoinScriptType.P2SH_P2WPKH},
  {label: 'HD Legacy (P2PKH)', type: BitcoinScriptType.P2PKH},
]

type Balances = Record<BitcoinScriptType, string>

const AddressType = (({open, close}: ConnectProps,) => {
  const { settings: {scriptType, setScriptType, network}, switchToAccount, current, connectedScriptTypes} = useKeystoneStore();
  const [balances, setBalances] = useState<Balances>();

  useEffect(() => {
    if(open) {
      queryCoinV2().then(result => {
        const coins = Object.entries(NETWORK_SCRIPT_TO_COIN[network]) as [BitcoinScriptType, SupportedCoins][];
        const allBalances = coins.reduce((allBalances, [scriptType, coin]) => {
          const balance = result.coins[coin]?.balance;
          const balanceInBtc = balance
            ? satoshiToBTC(Number(balance))
            : (connectedScriptTypes(network).includes(scriptType)) ? 0 : "--";
          return {
            ...allBalances,
            [scriptType]: balanceInBtc
          }
        }, {} as Balances)
        setBalances(allBalances);
      }).catch((e) => {
        console.error("fetch balance failed", e);
      })
    } else {
      setBalances(undefined);
    }
  }, [open, network])

  const onAddressTypedChecked  = (addressType: AddressType) => {
    setScriptType(addressType.type);
    current && switchToAccount(current.mfp, addressType.type, network);
    close();
  }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{width: '440px', marginTop: '120px', borderRadius: '20px'}}
      >
        <ModalHeader>
          <ModalHeaderContainer>
            <ModalHeaderLabel>Address Type</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close} />
        </ModalHeader>

        <AddressContainer>
          {addressTypeOptions.map((item) => (
            <AddressItem onClick={() => onAddressTypedChecked(item)} key={item.label}>
              <AddressItemLabel>
                <span>{item.label}</span>
                <span>{balances?.[item.type] || "--"} {bitcoinUnitMap[network].BTC}</span>
              </AddressItemLabel>
              <AddressItemRadio value={item.label} checked={scriptType === item.type}/>
            </AddressItem>
          ))}
        </AddressContainer>

        <AddressTips>
          <p>Choose the correct address type to gain access to your assets.</p>
          <p>
            If this is the first time you are using this secret key, we recommend you to use
            <span>{" "}"HD Native Segwit (Bech32)"{" "}</span>
            by default for lower transactions fees.
          </p>
        </AddressTips>
      </Modal>
    </TransitionablePortal>
  )
})

export default AddressType
