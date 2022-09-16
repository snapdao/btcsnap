import React, { useEffect } from 'react';
import Account from "./components/Account";
import Connect from "./components/Connect";
import { getKeystoneStore, MobxStoreProvider } from "./mobx";
import { trackInit } from "./tracking";
import { AppCheck } from "./AppCheck";

function App() {
  const mobxStore = getKeystoneStore();

  useEffect(() => {
    trackInit();
  }, [])

  return (
    <MobxStoreProvider value={mobxStore}>
      <AppCheck/>
      <Connect/>
      <Account/>
    </MobxStoreProvider>
  );
}

export default App;
