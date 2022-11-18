import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../../mobx';
import ReceiveViewModel, { ReceiveStep } from './model';
import LightningReceiveCreateModal from './Create';
import LightningReceiveInvoiceModal from './Invoice';

interface ContainerProps {
  currencyRate: number;
  close: () => void;
}

const ReceiveContainer = ({ currencyRate, close }: ContainerProps) => {
  const { currentUnit } = useAppStore();

  const model = new ReceiveViewModel(currentUnit, currencyRate);

  return <LightningReceiveModal model={model} close={close} />;
};

interface LightningReceiveModalProps {
  model: ReceiveViewModel;
  close: () => void;
}

const LightningReceiveModal = observer((props: LightningReceiveModalProps) => {
  const { model } = props;
  return (
    <>
      {
        {
          [ReceiveStep.Create]: <LightningReceiveCreateModal {...props} />,
          [ReceiveStep.Invoice]: <LightningReceiveInvoiceModal {...props} />,
        }[model.step]
      }
    </>
  );
});

export default ReceiveContainer;
