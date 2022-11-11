import { observer } from 'mobx-react-lite';
import CreateWallet from './CreateWallet';
import Ready from './Ready';
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from '../../mobx/user';

const SetupLightning = observer(() => {
  const {
    user: { LNWalletStep },
  } = useAppStore();

  return (
    <>
      {LNWalletStep === LNWalletStepStatus.Ready && <Ready />}
      {LNWalletStep === LNWalletStepStatus.CreateWallet && <CreateWallet />}
    </>
  );
});

export default SetupLightning;
