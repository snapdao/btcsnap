import React, { useCallback, useState } from 'react';
import { ReactComponent as ConnectIcon } from "./image/connect.svg"
import { ReactComponent as Reveal } from "./image/reveal.svg"
import { ReactComponent as LoadingIcon } from "./image/loading.svg"
import Modal from "./Modal";
import { getExtendedPublicKey } from "../../lib/snap";
import { useKeystoneStore } from "../../mobx";
import { trackGetAddress } from "../../tracking";
import { register } from "../../services/CryptoService/register";
import { AppStatus } from "../../mobx/runtime";
import { observer } from "mobx-react-lite";

export interface RevealXpubProps {
  open: boolean;
  close: () => void;
  onRevealed: () => void;
}

const RevealXpub = observer(({open, close, onRevealed}: RevealXpubProps) => {
  const { settings: { network, scriptType }, current, runtime: { setStatus } } = useKeystoneStore();
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const getXpub = useCallback(async () => {
    setIsRevealing(true);
    getExtendedPublicKey(network, scriptType, async ({xpub, mfp}) => {
      if (xpub) {
        trackGetAddress(network);
        setStatus(AppStatus.Register);
        try {
          await register(xpub, mfp, scriptType, network);
          onRevealed();
        } catch (e) {
          console.error("Register failed", e);
        }
      }
      setIsRevealing(false);
    })
  }, [isRevealing, setIsRevealing, network, current?.xpub])

  return (
    <Modal open={open} close={close} isDisabled={isRevealing}>
      <ConnectIcon className="Connect-flask-icon" />
      <h2>Get Addresses for <br/> Bitcoin Snap</h2>
      <p style={{ marginBottom: 100}} className="Connect-install">Your Bitcoin account addresses will be created along with your MetaMask public key.</p>
      <button className="Connect-button" disabled={isRevealing} onClick={getXpub}>
        { isRevealing ?
          <>
            <LoadingIcon className='Loading-icon'/>
          </> :
          <>
            <Reveal />
            <span>Get Addresses</span>
          </>
        }
      </button>
    </Modal>
  );
});

export default RevealXpub;
