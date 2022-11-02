import { BitcoinNetwork, Wallet } from '../interface';
import { getPersistedData, updatePersistedData } from '../utils/manageState';

export async function manageNetwork(origin: string, wallet: Wallet, action: 'get' | 'set', target?: BitcoinNetwork): Promise<string | void> {
  switch (action) {
    case 'get':
      return getPersistedData<BitcoinNetwork | "">(wallet, "network", "");
    case 'set':
      const result = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Switch your network',
            description: `Do you want to allow ${origin} to switch Bitcoin network to ${target}?`,
          },
        ],
      });
      if (result) {
        await updatePersistedData(wallet, "network", target)
        return target;
      } else {
        return "";
      }
    default:
      throw Error('Action not supported');
  }
}
