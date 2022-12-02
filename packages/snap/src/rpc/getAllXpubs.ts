import { networks } from 'bitcoinjs-lib';
import { BitcoinNetwork, ScriptType, Wallet } from '../interface';
import { convertXpub } from '../bitcoin/xpubConverter';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { RequestErrors, SnapError } from '../errors';


export async function getAllXpubs(origin: string, wallet: Wallet): Promise<{xpubs: string[], mfp: string}> {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Access your extended public key',
        description: `Do you want to allow ${origin} to access \n Bitcoin Legacy, \nSegWit and \nNative SegWit extended public keys of mainnet and testnet?`,
      },
    ],
  });

  if (result) {
    let xfp = '';
    const xpubsInNetworks = await Promise.all(Object.values(BitcoinNetwork).map(async (bitcoinNetwork: BitcoinNetwork) => {
      const network = bitcoinNetwork === BitcoinNetwork.Main ? networks.bitcoin : networks.testnet;
      return await Promise.all(Object.values(ScriptType).map(async (scriptType: ScriptType) => {
        const { node: accountNode, mfp } = await extractAccountPrivateKey(wallet, network, scriptType);
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
