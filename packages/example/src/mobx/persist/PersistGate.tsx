import { observer } from 'mobx-react-lite';
import React, { Fragment, FunctionComponent } from 'react';

export const PersistGate: FunctionComponent<{
  store: any;
}> = observer((props) => {
  return <Fragment>{props.store._rehydrated ? props.children : null}</Fragment>;
});
