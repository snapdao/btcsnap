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
  TransactionFeeLevel,
  TransactionFeeItemValue,
  TransactionFeeRadio,
} from "./styles"
import { FeeRate } from "./type";


interface TransactionFeeProps {
  open: boolean;
  close: () => void;
  model: SendViewModel;
}

interface TransactionFeeType{
  label: string;
  type: keyof FeeRate;
  time: number;
  fee: number;
  satVByte: number;
}

const transactionFeeOptions = (fee: FeeRate, feeRate: FeeRate) : TransactionFeeType[] => [
  { label: 'Fast', type: 'high', time: 30, fee: fee.high, satVByte: feeRate.high },
  { label: 'Medium', type: 'recommended', time: 60, fee: fee.recommended, satVByte: feeRate.recommended },
  { label: 'Slow', type: 'low', time: 70, fee: fee.low, satVByte: feeRate.low }
]

const TransactionFee = observer(({open, close, model}: TransactionFeeProps) => {

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
          {transactionFeeOptions(model.fees, model.feeRate).map((item) => (
            <TransactionFeeItem
              key={item.label}
              onClick={() => {
                model.setSelectedFeeRate(item.type);
                close();
              }}
            >
              <div>
                <TransactionFeeLevel>
                  <span>{item.label}</span>
                  <span>~{item.time}m</span>
                </TransactionFeeLevel>
                <TransactionFeeItemValue>
                  <span>{model.amountText === '' ? '--' : item.fee} {model.mainUnit}</span>
                  <span>{item.satVByte} sat/vByte</span>
                </TransactionFeeItemValue>
              </div>
              <TransactionFeeRadio value={item.label} checked={model.selectedFeeRate === item.type} />
            </TransactionFeeItem>
          ))}
        </TransactionFeeContainer>
      </Modal>
    </TransitionablePortal>
  )
})

export default TransactionFee
