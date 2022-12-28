import { InvoiceDetail, InvoiceTypes } from '../../../../types';
import { InvoiceReceiveModal } from './InvoiceReceiveModal';
import { InvoiceSendModal } from './InvoiceSendModal';
import { OnChainModal } from './OnChainModal';

export interface TransactionProps {
  open: boolean;
  close: () => void;
  invoice: InvoiceDetail;
  parent?: HTMLElement
}

export const InvoiceDetailModal = (props: TransactionProps) => {
  switch (props.invoice.type){
    case InvoiceTypes.Sent:
      return <InvoiceSendModal {...props} />;
    case InvoiceTypes.Received:
      return <InvoiceReceiveModal {...props} />;
    default:
      return <OnChainModal {...props} />;
  }
};
