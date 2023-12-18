import { PsbtInput, PsbtOutput, TapBip32Derivation } from "bip174/src/lib/interfaces";
import { HDSigner, Psbt, Signer, crypto, Transaction } from 'bitcoinjs-lib';
import { ValidateSigFunction } from "bitcoinjs-lib/src/psbt";
import { isTaprootInput, toXOnly } from "bitcoinjs-lib/src/psbt/bip371";
import { SignInputOptions } from "interface";

interface TweakHDSigner extends HDSigner {
    derivePath(path: string): TweakHDSigner;
    tweak(t: Buffer): Signer
}

function checkForInput<PsbtInput>(inputs: PsbtInput[], inputIndex: number): PsbtInput {
    const input = inputs[inputIndex];
    if (input === undefined) throw new Error(`No input #${inputIndex}`);
    return input;
}

function getTapSignersFromHD(
    inputIndex: number,
    inputs: PsbtInput[],
    hdKeyPair: TweakHDSigner,
): Array<TweakHDSigner> {
    const input = checkForInput(inputs, inputIndex);
    if (!input.tapBip32Derivation || input.tapBip32Derivation.length === 0) {
        throw new Error('Need tapBip32Derivation to sign with HD');
    }
    const myDerivations = input.tapBip32Derivation
        .map(bipDv => {
            if (bipDv.masterFingerprint.equals(hdKeyPair.fingerprint)) {
                return bipDv;
            } else {
                return;
            }
        })
        .filter(v => !!v);
    if (myDerivations.length === 0) {
        throw new Error(
            'Need one tapBip32Derivation masterFingerprint to match the HDSigner fingerprint',
        );
    }
    const signers: Array<TweakHDSigner> = myDerivations.map(bipDv => {
        const node = hdKeyPair.derivePath(bipDv!.path);
        const xOnlyPubKey = toXOnly(node.publicKey);
        if (!bipDv!.pubkey.equals(xOnlyPubKey)) {
            throw new Error('pubkey did not match tapBip32Derivation');
        }
        return node;
    });
    return signers;
}

function tweakSigner(childNode: TweakHDSigner) {
    const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);
    const tweakedChildNode = childNode.tweak(
        crypto.taggedHash('TapTweak', childNodeXOnlyPubkey),
    );
    return tweakedChildNode;
}

export function signTapInputHD(
    psbt: Psbt,
    inputIndex: number,
    hdKeyPair: TweakHDSigner,
    signInputOpts?: SignInputOptions,
): Psbt {
    const signers = getTapSignersFromHD(
        inputIndex,
        psbt.data.inputs,
        hdKeyPair,
    ) as TweakHDSigner[];
    const {
        disableTweakSigner = false,
        sighashTypes
    } = signInputOpts;
    signers.forEach(signer => psbt.signTaprootInput(
        inputIndex,
        disableTweakSigner ? signer : tweakSigner(signer),
        undefined,
        sighashTypes,
    ));
    return psbt;
}

function tapBip32DerivationIsMine(
    root: HDSigner,
): (d: TapBip32Derivation) => boolean {
    return (d: TapBip32Derivation): boolean => {
        if (!d.masterFingerprint.equals(root.fingerprint)) return false;
        if (!toXOnly(root.derivePath(d.path).publicKey).equals(d.pubkey)) return false;
        return true;
    };
}

export function tapInputHasHDKey(input: PsbtInput, root: HDSigner): boolean {
    const derivationIsMine = tapBip32DerivationIsMine(root);
    return (
        !!input.tapBip32Derivation && input.tapBip32Derivation.some(derivationIsMine)
    );
}

export function tapOutputHasHDKey(output: PsbtOutput, root: HDSigner): boolean {
    const derivationIsMine = tapBip32DerivationIsMine(root);
    return (
        !!output.tapBip32Derivation && output.tapBip32Derivation.some(derivationIsMine)
    );
}

function range(n: number): number[] {
    return [...Array(n).keys()];
}

export function signAllInputsHD(
    psbt: Psbt,
    hdKeyPair: TweakHDSigner,
    signInputOpts: SignInputOptions[],
): Psbt {
    if (psbt.data.inputs.length != signInputOpts.length) {
        throw new Error('Need options for each input');
    }

    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        throw new Error('Need HDSigner to sign input');
    }

    const results: boolean[] = [];
    for (const i of range(psbt.data.inputs.length)) {
        try {
            if (isTaprootInput(psbt.data.inputs[i])) {
                signTapInputHD(psbt, i, hdKeyPair, signInputOpts[i]);
            } else {
                psbt.signInputHD(i, hdKeyPair, signInputOpts[i].sighashTypes);
            }
            results.push(true);
        } catch (err) {
            results.push(false);
        }
    }
    if (results.every(v => v === false)) {
        throw new Error('No inputs were signed');
    }
    return psbt;
}

export function validateSignaturesOfAllInputs(psbt: Psbt, validator: ValidateSigFunction, schnorrValidator: ValidateSigFunction): boolean {
    checkForInput(psbt.data.inputs, 0); // making sure we have at least one
    const results = range(psbt.data.inputs.length).map(idx => {
        const input = psbt.data.inputs[idx];
        if (isTaprootInput(input)) {
            return psbt.validateSignaturesOfInput(idx, schnorrValidator);
        } else {
            return psbt.validateSignaturesOfInput(idx, validator);
        }
    });
    return results.reduce((final, res) => res === true && final, true);
}