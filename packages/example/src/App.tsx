import React, { useState, useEffect } from 'react';
import { connect, getExtendedPublicKey, signPsbt } from './lib/snap';
import {
  addressAggrator,
  countUtxo,
  satoshiToBTC,
  btcToSatoshi,
} from './lib/helper';
import { genreatePSBT, getNodeFingerPrint, sendTx } from './lib/index';
import './App.css';
import { PageHeader } from './components/Header';
import { PageFooter } from './components/Footer';
import { Address } from './components/Address';
import SendBox from './components/Send';
import AddressBox from './components/AddressBox';
import Banner from './components/Banner';
import { TransactionList } from './components/TransactionList';
import { useExtendedPubKey } from './hook/useExtendedPubKey';
import { useFeeRate } from './hook/useBitcoinTx';
import { useTransaction } from './hook/useTransaction';
import { BitcoinNetwork } from './interface';
import {
  Header,
  Divider,
  Icon,
  Grid,
  Segment,
  Button,
} from 'semantic-ui-react';

function App() {
  const [connected, setConnectStatus] = useState(false);
  const [network, setNetwork] = useState<BitcoinNetwork>(BitcoinNetwork.Test);
  const [target, setTarget] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const { feeRate } = useFeeRate(network);
  const { txList, addTx, refresh } = useTransaction(network);

  const connectCallback = () => setConnectStatus(true);

  const {
    utxoList,
    recieveAddressList,
    changeAddressList,
    setPubKey,
    loading,
    pubKey,
  } = useExtendedPubKey('', network);

  const utxoMap = countUtxo(utxoList);
  const address = addressAggrator(
    recieveAddressList,
    changeAddressList,
    utxoMap,
  );

  const onSendClick = async () => {
    try {
      const psbt = genreatePSBT(
        { address: target, value: btcToSatoshi(value) },
        utxoList,
        feeRate,
        {
          addressList: recieveAddressList.concat(changeAddressList),
          masterFingerprint: getNodeFingerPrint(pubKey),
          changeAddress:
            changeAddressList[changeAddressList.length - 1].address,
        },
        network,
      );
      const { txId, txHex } = await signPsbt(psbt.toBase64(), network);
      await sendTx(txHex, network);
      addTx(txId);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  const lastReceiveAddress =
    recieveAddressList.length > 0
      ? recieveAddressList[recieveAddressList.length - 1]
      : undefined;

  return (
    <div className="App">
      <PageHeader
        connected={connected}
        onConnect={() => connect(connectCallback)}
      />
      {connected ? (
        <>
          <Address
            onGetPubkey={() => getExtendedPublicKey(network, setPubKey)}
            network={network}
            setNetwork={setNetwork}
            items={address}
            loading={loading}
            balance={satoshiToBTC(
              utxoList.reduce((acc, current) => acc + current.value, 0),
            )}
          />

          <Segment>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Header as="h3">Send Transaction</Header>
                <SendBox
                  feeRate={feeRate}
                  value={value}
                  target={target}
                  setTarget={setTarget}
                  setValue={setValue}
                  onSendClick={onSendClick}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">BTC Address</Header>
                <AddressBox
                  address={
                    lastReceiveAddress ? lastReceiveAddress.address : undefined
                  }
                  path={
                    lastReceiveAddress ? lastReceiveAddress.path : undefined
                  }
                />
              </Grid.Column>
            </Grid>
            <Divider vertical>
              <Icon name="bitcoin" color="orange" />
            </Divider>
          </Segment>
          <Segment clearing>
            <Header as="h3" floated="left">
              Transactions
            </Header>
            <Header as="h3" floated="right">
              <Button icon="refresh" onClick={refresh}>
                <Icon name="refresh" />
              </Button>
            </Header>
            <TransactionList items={txList} network={network} />
          </Segment>
        </>
      ) : (
        <Banner />
      )}
      <PageFooter />
    </div>
  );
}

export default App;
