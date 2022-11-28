import { observer } from 'mobx-react-lite';
import TopUpWithWalletModal from './Wallet';
import TopUpWithExternalWalletModal from './ExternalWallet';
import { BitcoinNetwork, BitcoinScriptType, BitcoinUnit } from '../../interface';

interface Props {
  type: 'wallet' | 'externalWallet';
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
    wallet: <TopUpWithWalletModal close={close} {...walletProps} />,
    externalWallet: <TopUpWithExternalWalletModal close={close} />,
  }[type];
});

export default TopUpModal;
