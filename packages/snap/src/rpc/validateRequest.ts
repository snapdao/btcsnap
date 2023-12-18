import { BitcoinNetwork, Snap } from '../interface';
import { getPersistedData } from '../utils/manageState';
import { RpcRequest } from '../index';
import { RequestErrors, SnapError } from '../errors';

const DOMAIN_WHITELIST = [/\.justsnap\.io$/];

const validateNetwork = async (snap: Snap, network: BitcoinNetwork) => {
  const snapNetwork = await getPersistedData(snap, 'network', '');
  if (snapNetwork && network !== snapNetwork) {
    throw SnapError.of(RequestErrors.NetworkNotMatch);
  }
};

const validateDomain = async (domain: string) => {
  const isDomainValid = DOMAIN_WHITELIST.some((pattern) =>
    pattern.test(domain),
  );
  if (!isDomainValid) {
    throw SnapError.of(RequestErrors.DomainNotAllowed);
  }
};

export const validateRequest = async (
  snap: Snap,
  origin: string,
  request: RpcRequest['request'],
) => {
  switch (request.method) {
    case 'btc_getPublicExtendedKey':
    case 'btc_signPsbt':
      await validateNetwork(snap, request.params.network);
      break;
    case 'btc_getLNDataFromSnap':
    case 'btc_saveLNDataToSnap':
    case 'btc_signLNInvoice':
      await validateDomain(origin);
  }
};
