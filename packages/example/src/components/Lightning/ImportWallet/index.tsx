import React, { useMemo } from 'react';
import { ImportWallet as View } from './ImportWallet';
import { LightningImportWalletModel } from './model';

export interface ImportWalletProps {
  open: boolean;
  close: () => void;
  onSucceed: () => void;
  parent: HTMLElement;
}

export const ImportWallet = (props: ImportWalletProps) => {
  const model = useMemo(() => {
    return new LightningImportWalletModel();
  }, []);

  return <View {...props} model={model} />;
};
