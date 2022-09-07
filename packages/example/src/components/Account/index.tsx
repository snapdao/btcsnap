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

const Account = observer(() => {
  const { global: { bip44Xpub: pubKey } } = useKeystoneStore();
  const {
    loading,
    utxoList,
    receiveAddressList,
    changeAddressList,
    refresh: refreshBalance
  } = useExtendedPubKey();

  const balance = satoshiToBTC(utxoList.reduce((acc, current) => acc + current.value, 0));
  const receiveAddress = receiveAddressList?.[0]?.address || ""

  const sendInfo = useMemo(() => {
    if (pubKey !== '' && changeAddressList.length)
      return {
        addressList: receiveAddressList.concat(changeAddressList),
        masterFingerprint: getNodeFingerPrint(pubKey),
        changeAddress: changeAddressList[changeAddressList.length - 1].address,
      };
    else {
      return undefined;
    }
  }, [receiveAddressList, changeAddressList, pubKey]);

  return (
    <>
      <Modal open={loading}>
        <Loader inverted />
      </Modal>
      <AccountBackground>
        <AccountContainer>
          <Main balance={balance} receiveAddress={receiveAddress} utxos={utxoList} sendInfo={sendInfo} />
          <Aside refreshBalance={refreshBalance}/>
        </AccountContainer>
        <AccountLabel>Powered by MetaMask Snaps</AccountLabel>
      </AccountBackground>
    </>
  );
});

export default Account;
