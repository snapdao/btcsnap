import * as bip32 from 'bip32';
import { networks, Psbt } from 'bitcoinjs-lib';
import { PsbtValidator } from '../src/bitcoin/PsbtValidator';
import { AccountSigner } from '../src/bitcoin';
import { BitcoinNetwork } from '../src/interface';

const getAccountSigner = () => {
  const testPrivateAccountKey = "tpubD6NzVbkrYhZ4YZPf7AnF4SbL1BsZGCgsAi5gFupTMCjpvKFqVrHz3gBEdi1yp7F5oH5MqMq3gDV2r2U9DPGkV2JEfiGbjg7ecw549tZ8VS8"
  let accountNode = bip32.fromBase58(testPrivateAccountKey, networks.testnet)
  return { signer: new AccountSigner(accountNode, Buffer.from("f812d139", 'hex')), node: accountNode }
}


describe('psbtValidator', () => {
  const psbtBase64Str = 'cHNidP8BAHECAAAAASpPo+Jtjb8ce88iDgUe9MdBl/N0RXzOyTt6bYRF4KxgAAAAAAD/////AkANAwAAAAAAFgAUBbP+LIMGzIE0s5pdBRLRb/T3kYaazQsAAAAAABYAFDUcL8Uq83TUCsXnr18EDVw08zQ9AAAAAAABAP1UAQIAAAAAAQIbzNzgXMu2XcHbu/VK6Tv2aYkp3WBu0PijNRnjyvh1eQEAAAAA/////wL6QmQPXjZt03YXBX2QbexW+etvDRpeUJE+cz7D5ardAAAAAAD/////Afz3DgAAAAAAFgAUvApnUSw4MVXYWN2ZqWf3hCAWGsoCSDBFAiEA+axvhH4bFn2mSxo6xzybYtrAjdpG0YzlqBam0UNaE3kCIA0lg97qGHi0rKC7hWQXnMSnWbaCII6nGpHErzpoSHNMASEDSB6PkHcBABG+ayUezMfaQN0i6+DO4DwxtF+nbuWWp+ICRzBEAiAYgnrWAOCiD55kZsBSiX/UNMnDsmhcFzKno/6T1nP92gIgPtzzZuB0FjdMrkpzWkDZurYJR7MBcRnszVgqyjX5xEsBIQMR9PpNCfA5TzCasyKhJsp1vevr907O2Kru24aJS/h08QAAAAABAR/89w4AAAAAABYAFLwKZ1EsODFV2Fjdmaln94QgFhrKIgYDSB6PkHcBABG+ayUezMfaQN0i6+DO4DwxtF+nbuWWp+IY+BLROVQAAIABAACAAAAAgAEAAAAKAAAAAAAiAgJgiLaAsqyAi3BUwv3EgxEuXiYfGOFeDgCax2fzYa/sZBj4EtE5VAAAgAEAAIAAAACAAQAAAAsAAAAA';

  it('should be able to validate psbt', function() {
    const { signer } = getAccountSigner();
    const psbt = Psbt.fromBase64(psbtBase64Str, { network: networks.testnet})
    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);

    expect(psbtValidator.validate(signer)).toBe(true);
  });
});
