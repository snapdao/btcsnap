import React, {useMemo} from 'react';
import { observer } from "mobx-react-lite";
import { Loader, Modal } from 'semantic-ui-react';
import Main from "./Main";
import Aside from "./Aside";
import { useExtendedPubKey } from "../../hook/useExtendedPubKey";
import { satoshiToBTC } from "../../lib/helper";
import {getNodeFingerPrint} from "../../lib";
import {useKeystoneStore} from "../../mobx";
import { AccountBackground, AccountContainer, AccountLabel } from "./styles"
import { AppStatus } from "../../mobx/runtime";

const Account = observer(() => {
  const { current, runtime: { status } } = useKeystoneStore();
  const {
    balance: balanceInSatoshi,
    loading,
    utxoList,
    receiveAddressList,
    changeAddressList,
    refresh: refreshBalance
  } = useExtendedPubKey();

  const balance = satoshiToBTC(balanceInSatoshi);

  const sendInfo = useMemo(() => {
    if (current?.xpub !== '' && changeAddressList.length)
      return {
        addressList: receiveAddressList.concat(changeAddressList),
        masterFingerprint: getNodeFingerPrint(current?.xpub || ""),
        changeAddress: changeAddressList[changeAddressList.length - 1].address,
      };
    else {
      return undefined;
    }
  }, [receiveAddressList, changeAddressList, current?.xpub]);

  return (
    <>
      <Modal open={loading || status === AppStatus.FetchBalance}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} utxos={utxoList} sendInfo={sendInfo} />
          <Aside refreshBalance={refreshBalance}/>
        </AccountContainer>
        <AccountLabel>Powered by MetaMask Snaps</AccountLabel>
      </AccountBackground>
    </>
  );
});

export default Account;
