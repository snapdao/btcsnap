import { InvoiceDetail, InvoiceTypes } from "../../../../types";
import { InvoiceReceiveModal } from "./InvoiceReceiveModal";
import { InvoiceSendModal } from "./InvoiceSendModal";

export interface TransactionProps {
  open: boolean;
  close: () => void;
  invoice: InvoiceDetail;
}

export const InvoiceDetailModal = (props: TransactionProps) => {
  if(props.invoice.type === InvoiceTypes.Sent){
    return <InvoiceSendModal {...props} />
  }
  return <InvoiceReceiveModal {...props} />
}
