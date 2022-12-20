import { observer } from 'mobx-react-lite';
import TopUpWithBitcoinModal from './Bitcoin';
import TopUpWithLightningInternalModal from './LightningInternal';
import TopUpWithExternalWalletModal from './LightningExternal';
import { BitcoinNetwork, BitcoinScriptType, BitcoinUnit } from '../../interface';

interface Props {
  type: 'bitcoin' | 'lightningWalletInternal' | 'lightningWalletExternal';
  close: () => void;
  walletProps: {
    currencyRate: number;
    network: BitcoinNetwork;
    scriptType: BitcoinScriptType;
    unit: BitcoinUnit;
  }
};

const TopUpModal = observer(({ type, close, walletProps }: Props) => {
  return {
    bitcoin: <TopUpWithBitcoinModal close={close} />,
    lightningWalletInternal: <TopUpWithLightningInternalModal close={close} {...walletProps} />,
    lightningWalletExternal: <TopUpWithExternalWalletModal close={close} />,
  }[type];
});

export default TopUpModal;
