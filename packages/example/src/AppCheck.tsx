import { useKeystoneStore } from "./mobx";
import { useMFPCheck } from "./hook/useMFPCheck";
import { useEffect } from "react";

export const AppCheck = () => {
  const { resetStore } = useKeystoneStore();
  const isSameMFP = useMFPCheck();

  useEffect(() => {
    // Clear everything if seed changed in MM
    if(!isSameMFP){
      resetStore();
    }
  }, [isSameMFP])

  return null;
}