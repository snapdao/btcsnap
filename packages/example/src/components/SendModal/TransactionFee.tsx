import { observer } from "mobx-react-lite";
import { Modal, TransitionablePortal } from "semantic-ui-react";
import CloseIcon from "../Icons/CloseIcon";
import SendViewModel from "./model";
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  TransactionFeeContainer,
  TransactionFeeItem,
  TransactionFeeItemLabel,
  TransactionFeeRadio,
} from "./styles"
import { FeeRate } from "./type";


interface TranscationFeeProps {
  open: boolean;
  close: () => void;
  model: SendViewModel;
}

interface TransationFeeType{
  label: string;
  type: keyof FeeRate;
  time: number;
  feeRate: number;
  satVByte: number;
}

const transactionFeeOptions = (fee: FeeRate, feeRate: FeeRate) : TransationFeeType[] => [
  { label: 'Fast', type: 'high', time: 30, feeRate: fee.high, satVByte: feeRate.high },
  { label: 'Medium', type: 'recommended', time: 60, feeRate: fee.recommended, satVByte: feeRate.recommended },
  { label: 'Slow', type: 'low', time: 70, feeRate: fee.low, satVByte: feeRate.low }
]

const TransationFee = observer(({open, close, model}: TranscationFeeProps) => {

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'slide up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{width: '440px', marginTop: '272px', borderRadius: '20px'}}
      >
        <ModalHeader>
          <ModalHeaderContainer>
            <ModalHeaderLabel>Transaction Fee</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close} />
        </ModalHeader>

        <TransactionFeeContainer>
          {transactionFeeOptions(model.feeRate, model.feeRate).map((item) => (
            <TransactionFeeItem onClick={() => (model.setSelectedFeeRate(item.type), close())} key={item.label}>
              <TransactionFeeItemLabel>
                <span>{item.label}<span>~{item.time}m</span></span>
                <span>
                  {model.amountText === '' ? '--' : item.feeRate}
                  <span>{model.unit}</span>
                  <span>{item.satVByte} sat/vByte</span>
                </span>
              </TransactionFeeItemLabel>
              <TransactionFeeRadio value={item.label} checked={model.selectedFeeRate === item.type} />
            </TransactionFeeItem>
          ))}
        </TransactionFeeContainer>
      </Modal>
    </TransitionablePortal>
  )
})

export default TransationFee
