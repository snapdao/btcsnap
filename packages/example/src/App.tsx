import React from 'react';
import Account from "./components/Account";
import Connect from "./components/Connect";
import { getKeystoneStore, MobxStoreProvider } from "./mobx";

function App() {
  const mobxStore = getKeystoneStore();

  return (
    <MobxStoreProvider value={mobxStore}>
      <Connect/>
      <Account/>
    </MobxStoreProvider>
  );
}

export default App;
