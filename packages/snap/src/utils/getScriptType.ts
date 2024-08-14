import {ScriptType} from 'interface';
import {pathMap} from '../rpc/getExtendedPublicKey';

export const getScriptType = (derivationPath: string) => {
  const path = derivationPath.split('/');
  for (const scriptType in pathMap) {
    if (pathMap[scriptType as ScriptType].every((v, i) => v === path[i])) {
      return scriptType as ScriptType;
    }
  }

  return null;
};
