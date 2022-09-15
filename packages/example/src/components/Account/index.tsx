import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useBalance } from "../../hook/useBalance";
import {useKeystoneStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel } from "./styles"
import { AppStatus } from "../../mobx/runtime";
import { useMFPCheck } from "../../hook/useMFPCheck";

const Account = observer(() => {
  const { runtime: {status}, resetStore } = useKeystoneStore();
  const { balance, rate, refresh } = useBalance();
  const isSameMFP = useMFPCheck();

  useEffect(() => {
    if(!isSameMFP){
      resetStore();
    }
  }, [isSameMFP])

  return (
    <>
      <Modal open={status !== AppStatus.Ready}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} rate={rate} />
          <Aside refreshBalance={refresh}/>
        </AccountContainer>
        <AccountLabel>Powered by MetaMask Snaps</AccountLabel>
      </AccountBackground>
    </>
  );
});

export default Account;
