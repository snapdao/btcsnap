import { getLNWalletData, KeyOptions } from "../../lib/snap";

export const getPassword = async (userId: string): Promise<string> =>{
  try {
    const password = await getLNWalletData(KeyOptions.Password, userId);
    return password || '';
  } catch (e) {
    return ''
  }
}
