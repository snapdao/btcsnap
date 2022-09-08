import React from "react";
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

const AddressType = (({open, close}: ConnectProps,) => {
  const { settings: {scriptType, setScriptType, network}, switchToAccount, current} = useKeystoneStore();

  const onAddressTypedChecked  = (addressType: AddressType) => {
    setScriptType(addressType.type);
    current && switchToAccount(current.mfp, addressType.type, network);
    close();
  }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'slide up', duration: '300' }}
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
                <span>0 BTC</span>
              </AddressItemLabel>
              <AddressItemRadio value={item.label} checked={scriptType === item.type}/>
            </AddressItem>
          ))}
        </AddressContainer>

        <AddressTips>
          <p>Choose the correct address type to gain access to your assets.</p>
          <p>
            If this is the first time you are using this secret key, we recommend you to use
            <span>"HD Native Segwit (Bech32)"</span>
            by default for lower transactions fees.
          </p>
        </AddressTips>
      </Modal>
    </TransitionablePortal>
  )
})

export default AddressType
