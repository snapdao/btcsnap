import { BitcoinNetwork, Snap } from '../interface';
import { getPersistedData, updatePersistedData } from '../utils/manageState';
import { RequestErrors, SnapError } from "../errors";
import { heading, panel, text } from "@metamask/snaps-ui";

export async function manageNetwork(origin: string, snap: Snap, action: 'get' | 'set', target?: BitcoinNetwork): Promise<string | void> {
  switch (action) {
    case 'get':
      return getPersistedData<BitcoinNetwork | "">(snap, "network", "");
    case 'set':
      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Switch your network'),
            text(`Do you want to allow ${origin} to switch Bitcoin network to ${target}?`),
          ]),
        },
      });
      if (result) {
        await updatePersistedData(snap, "network", target)
        return target;
      } else {
        return "";
      }
    default:
      throw SnapError.of(RequestErrors.ActionNotSupport);
  }
}
