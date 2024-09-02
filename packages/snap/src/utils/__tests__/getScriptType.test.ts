import { ScriptType } from "../../interface";
import { getScriptType } from "../getScriptType";

describe('isDerivationPathSupported', () => {
    it('should return ScriptType for supported derivation paths', () => {
        expect(getScriptType("m/44'/0'/0'/0/0")).toBe(ScriptType.P2PKH);
        expect(getScriptType("m/49'/0'/0'/0/0")).toBe(ScriptType.P2SH_P2WPKH);
        expect(getScriptType("m/84'/0'/0'/0/0")).toBe(ScriptType.P2WPKH);
    });

    it('should return null for unsupported derivation paths', () => {
        expect(getScriptType("m/86'/0'/0'/0/0")).toBe(null);
    });
});