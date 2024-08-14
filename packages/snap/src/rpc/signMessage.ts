import bitcoinMessage from 'bitcoinjs-message';
import {SnapError, RequestErrors} from '../errors';
import {BitcoinNetwork, ScriptType, Snap} from '../interface';
import {getPersistedData} from '../utils';
import {heading, panel, text, divider} from '@metamask/snaps-ui';
import {getNetwork} from '../bitcoin/getNetwork';
import * as bitcoin from 'bitcoinjs-lib';
import { getHDNode } from '../utils/getHDNode';
import { getScriptType } from '../utils/getScriptType';
import { SignMessageErrors } from '../errors/constant/SignMessageErrors';


export const signMessage = async (
  domain: string,
  snap: Snap,
  message: string,
  derivationPath: string,
    // TODO: implement bip322 message signing
  protocol: 'ecdsa' | 'bip322' = 'ecdsa',
) => {
  if (protocol !== 'ecdsa') {
    throw SnapError.of(RequestErrors.ActionNotSupport);
  }

  const snapNetwork = await getPersistedData<BitcoinNetwork>(
    snap,
    'network',
    '' as BitcoinNetwork,
  );

  const scriptType = getScriptType(derivationPath);

  if (!scriptType || ![ScriptType.P2PKH, ScriptType.P2SH_P2WPKH].includes(scriptType)) {
    throw SnapError.of(SignMessageErrors.DerivationPathNotSupported);
  }

  const path = derivationPath.split('/');
  const btcNetwork = getNetwork(snapNetwork);

  if (snapNetwork !== BitcoinNetwork.Main) {
    path[2] = "1'";
  }

  const {publicKey, privateKey} = await getHDNode(snap, path.join('/'));

  const address = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
      pubkey: publicKey,
      network: btcNetwork,
    }),
    network: btcNetwork,
  }).address as string;

  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Signature Request'),
        text(`Please verify this sign message request from ${domain}`),
        divider(),
        text("Only confirm this message if you approve the content and trust the requesting site."),
        panel([
          text(`**Address**:\n ${address}`),
          text(`**Network**:\n ${snapNetwork === BitcoinNetwork.Main ? 'Mainnet' : 'Testnet'}`),
          text(`**Message**:\n ${message}`),
        ]),
        divider(),
        text(`By signing this message, you verify that you own the account without broadcasting any on-chain transactions. This signature does not allow transactions to be broadcast on your behalf. Only sign messages that you trust.`)
      ]),
    },
  });

  if (!result) {
    throw SnapError.of(RequestErrors.RejectSign);
  }

    const signature = bitcoinMessage.sign(message, privateKey, true, {
      segwitType: scriptType === ScriptType.P2WPKH ? "p2wpkh" : "p2sh(p2wpkh)",
    });

    return {
      signature: signature.toString('base64'),
      address,
    };
  };
