import { useState } from "react";
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


interface ConnectProps {
  open: boolean;
  close: () => void;
  setAddressValue: any;
}

interface AddressType{
  label: string;
  type: BitcoinScriptType;
}

const addressTypeOptions: AddressType[] = [
  {label: 'HD Native SegWit (Bech32)', type: BitcoinScriptType.P2WPKH},
  {label: 'HD Nested SegWit (P2SH)', type: BitcoinScriptType.P2SH},
  {label: 'HD Legacy (P2PKH)', type: BitcoinScriptType.P2PKH},
]

const AddressType = (({open, close, setAddressValue}: ConnectProps,) => {
  const [addressTypeValue, setAddressTypeValue] = useState<BitcoinScriptType>(BitcoinScriptType.P2WPKH);

  const onAddressTypedChecked  = (item: AddressType) => {
    setAddressTypeValue(item.type);
    setAddressValue(item.label);
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
              <AddressItemRadio value={item.label} checked={addressTypeValue === item.type}></AddressItemRadio>
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
