export const transaction = {
  from: 'tb1qhs9xw5fv8qc4tkzcmkv6jelhssspvxk2wmtd0v',
  to: 'tb1qqkelutyrqmxgzd9nnfws2yk3dl600yvxagfqu7',
  value: 200000,
  network: 'testnet',
  fee: 7458,
  changeAddress: 'tb1qx5wzl3f27d6dgzk9u7h47pqdts60xdpax4w5rf',
};

export const psbtFixture = {
  tx: {
    inputs: [
      {
        hash: Buffer.from('2a4fa3e26d8dbf1c7bcf220e051ef4c74197f374457ccec93b7a6d8445e0ac60', 'hex'),
        index: 0,
        sequence: 4294967295,
      },
    ],
    outputs: [
      {
        script: Buffer.from('0014368c82eb0844679fdd77679bcf193352d5782003', 'hex'),
        value: 200000,
        address: 'tb1qx6xg96cgg3nelhthv7du7xfn2t2hsgqrvdg7mj',
      },
      {
        script: Buffer.from('0014351c2fc52af374d40ac5e7af5f040d5c34f3343d', 'hex'),
        value: 773304,
        address: 'tb1qx5wzl3f27d6dgzk9u7h47pqdts60xdpax4w5rf',
      },
    ],
  },
  data: {
    inputs: [
      {
        nonWitnessUtxo: Buffer.from('020000000001012a4fa3e26d8dbf1c7bcf220e051ef4c74197f374457ccec93b7a6d8445e0ac600000000000ffffffff02400d030000000000160014368c82eb0844679fdd77679bcf193352d5782003b8cc0b0000000000160014351c2fc52af374d40ac5e7af5f040d5c34f3343d0247304402202c34605ecb34ee5829c5b8e7e88fa16ac6462a162b4dcadfc556fb29dc9475c402207cd2fd14477d5aadaaa47f252cacf6668d787184943fd591d8d5612d99dc1d4a012103481e8f9077010011be6b251eccc7da40dd22ebe0cee03c31b45fa76ee596a7e200000000', 'hex'),
        witnessUtxo: {
          script: Buffer.from('0014bc0a67512c383155d858dd99a967f78420161aca', 'hex'),
          value: 773304,
        },
        bip32Derivation: [{
          masterFingerprint: Buffer.from('f812d139', 'hex'),
          pubkey: Buffer.from('03481e8f9077010011be6b251eccc7da40dd22ebe0cee03c31b45fa76ee596a7e2', 'hex'),
          path: `m/84'/1'/0'/1/10`,
        }],
      },
    ],
    outputs: [
      {},
      {
        bip32Derivation: [{
          masterFingerprint: Buffer.from('f812d139', 'hex'),
          pubkey: Buffer.from('026088b680b2ac808b7054c2fdc483112e5e261f18e15e0e009ac767f361afec64', 'hex'),
          path: `m/84'/1'/0'/1/11`,
        }],
      },
    ],
  },
  base64: 'cHNidP8BAHECAAAAASpPo+Jtjb8ce88iDgUe9MdBl/N0RXzOyTt6bYRF4KxgAAAAAAD/////AkANAwAAAAAAFgAUBbP+LIMGzIE0s5pdBRLRb/T3kYaazQsAAAAAABYAFDUcL8Uq83TUCsXnr18EDVw08zQ9AAAAAAABAP1UAQIAAAAAAQIbzNzgXMu2XcHbu/VK6Tv2aYkp3WBu0PijNRnjyvh1eQEAAAAA/////wL6QmQPXjZt03YXBX2QbexW+etvDRpeUJE+cz7D5ardAAAAAAD/////Afz3DgAAAAAAFgAUvApnUSw4MVXYWN2ZqWf3hCAWGsoCSDBFAiEA+axvhH4bFn2mSxo6xzybYtrAjdpG0YzlqBam0UNaE3kCIA0lg97qGHi0rKC7hWQXnMSnWbaCII6nGpHErzpoSHNMASEDSB6PkHcBABG+ayUezMfaQN0i6+DO4DwxtF+nbuWWp+ICRzBEAiAYgnrWAOCiD55kZsBSiX/UNMnDsmhcFzKno/6T1nP92gIgPtzzZuB0FjdMrkpzWkDZurYJR7MBcRnszVgqyjX5xEsBIQMR9PpNCfA5TzCasyKhJsp1vevr907O2Kru24aJS/h08QAAAAABAR/89w4AAAAAABYAFLwKZ1EsODFV2Fjdmaln94QgFhrKIgYDSB6PkHcBABG+ayUezMfaQN0i6+DO4DwxtF+nbuWWp+IY+BLROVQAAIABAACAAAAAgAEAAAAKAAAAAAAiAgJgiLaAsqyAi3BUwv3EgxEuXiYfGOFeDgCax2fzYa/sZBj4EtE5VAAAgAEAAIAAAACAAQAAAAsAAAAA',
  
};
