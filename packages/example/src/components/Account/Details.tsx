import { Modal } from 'semantic-ui-react';
import CloseIcon from "../Icons/CloseIcon";
import {ReactComponent as AccountIcon} from "./image/wallet.svg";
import AccountList from "./AccountList"
import {
  AccountDetailTop,
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  AccountDetailHeader,
  AccountTopBalance,
  AccountTopUnits,
  AccountDetailBottom
} from "./styles"

type AccountDetails = {
  open: boolean;
  close: () => void;
  utxoList: any[];
  balance: number;
  units: string;
}

const Details = (({open, close, utxoList, balance, units}: AccountDetails) => {
  return (
    <>
      <Modal
        className={'modal-container'}
        open={open}
        style={{
          height: '640px'
        }}
      >
        <AccountDetailTop>
          <ModalHeader>
            <ModalHeaderContainer>
              <AccountIcon />
              <ModalHeaderLabel>ACCOUNT</ModalHeaderLabel>
            </ModalHeaderContainer>
            <CloseIcon onClick={close} />
          </ModalHeader>
          <AccountDetailHeader>
            <AccountTopBalance>{balance}</AccountTopBalance>
            <AccountTopUnits>{units}</AccountTopUnits>
          </AccountDetailHeader>
        </AccountDetailTop>
        <AccountDetailBottom>
          <AccountList utxoList={utxoList} units={units} />
        </AccountDetailBottom>
      </Modal>
    </>
  )
})

export default Details