import React, { useEffect, useMemo } from 'react';
import LightningSendViewModel from './model';
import { SendStatus } from './types';
import { SendView } from './SendView';
import { ResultView } from './ResultView';
import { observer } from 'mobx-react-lite';

interface PayInvoiceProps {
  close: () => void;
  exchangeRate: number;
  balance: number;
}

export const PayInvoice = observer(({ close, balance, exchangeRate }: PayInvoiceProps) => {
  const model = useMemo(() => {
    return new LightningSendViewModel(balance, exchangeRate);
  }, []);

  useEffect(() => {
    model.setExchangeRate(exchangeRate);
  }, [exchangeRate]);
  
  return model.status === SendStatus.Init ? 
    <SendView model={model} close={close}/>
    : <ResultView model={model} close={close}/>;
});
