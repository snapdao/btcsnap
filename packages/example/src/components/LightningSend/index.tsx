import { SendView } from "./SendView";
import React, { useMemo } from "react";
import LightningSendViewModel from "./model";
import { TransitionablePortal } from "semantic-ui-react";
import { SendStatus } from "./types";

interface LightningSendProps {
  close: () => void;
  exchangeRate: number;
  balance: number;
  feeRange: string;
}

export const LightningSend = ({close, feeRange, balance, exchangeRate}: LightningSendProps) => {
  const model = useMemo(() => {
    return new LightningSendViewModel(balance, feeRange, exchangeRate);
  }, []);

  return (
    <TransitionablePortal
      open={true}
      transition={{animation: 'fade up', duration: 300}}
    >
      {model.status === SendStatus.Init && <SendView model={model} close={close} />}
    </TransitionablePortal>
  )
}
