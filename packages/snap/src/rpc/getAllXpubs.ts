import { panel, text, heading } from '@metamask/snaps-ui';
import { networks } from 'bitcoinjs-lib';
import { BitcoinNetwork, ScriptType, Snap } from '../interface';
import { convertXpub } from '../bitcoin/xpubConverter';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { RequestErrors, SnapError } from '../errors';


export async function getAllXpubs(origin: string, snap: Snap): Promise<{xpubs: string[], mfp: string}> {
  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Confirmation',
      content: panel([
        heading('Access your extended public key'),
        text(`${origin} is trying to access your Bitcoin Legacy, SegWit and Native SegWit extended public keys.`),
      ]),
    },
  });

  if (result) {
    let xfp = '';
    const xpubsInNetworks = await Promise.all(Object.values(BitcoinNetwork).map(async (bitcoinNetwork: BitcoinNetwork) => {
      const network = bitcoinNetwork === BitcoinNetwork.Main ? networks.bitcoin : networks.testnet;
      return await Promise.all(Object.values(ScriptType).map(async (scriptType: ScriptType) => {
        const { node: accountNode, mfp } = await extractAccountPrivateKey(snap, network, scriptType);
        xfp = xfp || mfp; 
        const accountPublicKey = accountNode.neutered();
        return convertXpub(accountPublicKey.toBase58(), scriptType, network);
      }));
    }));
    return {
      mfp: xfp,
      xpubs: xpubsInNetworks.flatMap(xpub => xpub)
    };
  }
  throw SnapError.of(RequestErrors.RejectKey);
}
