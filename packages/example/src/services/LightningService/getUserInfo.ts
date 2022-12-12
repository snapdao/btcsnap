import { ErrorResponse } from '../../api/lightning/query';
import { getLNWalletData, GetLNWalletDataKey } from '../../lib/snap';

export const getPassword = async (
  userId: string,
): Promise<string | null | undefined | ErrorResponse> => {
  try {
    const password = await getLNWalletData(GetLNWalletDataKey.Password, userId);
    return password;
  } catch (e: any) {
    return e;
  }
};
