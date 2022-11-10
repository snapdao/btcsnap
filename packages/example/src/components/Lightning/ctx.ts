import { createCtx } from '../../utils/ctx';

export type LightningSetupStep = 'createWallet' | 'recoveryKey' | null;

interface ContextState {
  setupStep: LightningSetupStep;
  recoveryKey: string | null;
}

export const [LightningContext, LightningContextProvider] =
  createCtx<ContextState>({
    setupStep: null,
    recoveryKey: null,
  });
