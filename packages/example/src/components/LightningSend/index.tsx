import React, { useMemo } from "react";
import LightningSendViewModel from "./model";
import { SendStatus } from "./types";
import { SendView } from "./SendView";
import { ResultView } from "./ResultView";
import { observer } from "mobx-react-lite";

interface LightningSendProps {
  close: () => void;
  exchangeRate: number;
  balance: number;
}

export const LightningSend = observer(({close, balance, exchangeRate}: LightningSendProps) => {
  const model = useMemo(() => {
    return new LightningSendViewModel(balance, exchangeRate);
  }, []);

  return (
    <>
      {model.status === SendStatus.Init && <SendView model={model} close={close} />}
      {model.status !== SendStatus.Init && <ResultView model={model} close={close} />}
    </>
  )
});
