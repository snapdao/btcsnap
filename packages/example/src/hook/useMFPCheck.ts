import { useState, useEffect } from 'react';
import { useKeystoneStore } from "../mobx";
import { getMasterFingerprint } from "../lib/snap";

export const useMFPCheck = () => {
  const {current} = useKeystoneStore()
  const [isSameMFP, setIsSameMFP] = useState(true);

  useEffect(() => {
    current && getMasterFingerprint().then(mfp => {
      setIsSameMFP(current.mfp === mfp)
    });
  }, [current]);

  return isSameMFP;
};
