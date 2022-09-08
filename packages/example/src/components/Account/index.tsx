import React from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useBalance } from "../../hook/useBalance";
import { satoshiToBTC } from "../../lib/helper";
import {useKeystoneStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel } from "./styles"
import { AppStatus } from "../../mobx/runtime";

const Account = observer(() => {
  const { runtime: {status} } = useKeystoneStore();
  const { balance, rate, refresh } = useBalance();

  return (
    <>
      <Modal open={status !== AppStatus.Ready}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={satoshiToBTC(balance)} rate={rate} />
          <Aside refreshBalance={refresh}/>
        </AccountContainer>
        <AccountLabel>Powered by MetaMask Snaps</AccountLabel>
      </AccountBackground>
    </>
  );
});

export default Account;
