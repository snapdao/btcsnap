import { useKeystoneStore } from "./mobx";
import { useMFPCheck } from "./hook/useMFPCheck";
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';

export const AppCheck = observer(() => {
  const { resetStore } = useKeystoneStore();
  const { isChecking, isSameMFP } = useMFPCheck();

  useEffect(() => {
    const mfpChangedInMM = !isChecking && !isSameMFP
    if(mfpChangedInMM){
      resetStore();
    }
  }, [isChecking, isSameMFP])

  return <></>;
});
