import {BitcoinNetwork, Wallet} from '../interface';
import {getPersistedData} from '../utils/manageState';
import {RpcRequest} from '../index';
import { RequestErrors, SnapError } from '../errors';

const DOMAIN_WHITELIST = [/\.justsnap\.io$/];

const validateNetwork = async (wallet: Wallet, network: BitcoinNetwork) => {
  const snapNetwork = await getPersistedData(wallet, 'network', '');
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
  wallet: Wallet,
  origin: string,
  request: RpcRequest['request'],
) => {
  switch (request.method) {
    case 'btc_getPublicExtendedKey':
    case 'btc_signPsbt':
      await validateNetwork(wallet, request.params.network);
      break;
    case 'btc_getLNDataFromSnap':
    case 'btc_saveLNDataToSnap':
    case 'btc_signLNInvoice':
      await validateDomain(origin);
  }
};
