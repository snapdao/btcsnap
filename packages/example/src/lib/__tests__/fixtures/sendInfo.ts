import { BitcoinNetwork, BitcoinScriptType } from '../../../interface';

export const p2wpkhSendInfo = {
  scriptType: BitcoinScriptType.P2WPKH,
  sendInfo: {
    masterFingerprint: Buffer.from('9ad305ed', 'hex'),
    changeAddress: 'tb1qc437chw3mm5rahxzt2573y4qq4y77tk5m5dph7',
    changeAddressPath: 'M/84\'/1\'/0\'/1/12',
    changeAddressPubkey: Buffer.from('03e2cbd139c6e249d8bc842053ea41cf3430bf1d42ef9d694c657eaa7f010e0064', 'hex'),
  },
  network: BitcoinNetwork.Test,
  inputs: [
    {
      'txId': '5a3e9dff95a5d35c5ca9859a8425f2e41b5adce1f7c2bf40860d4a62075c6f45',
      'vout': 0,
      'value': 10000,
      'address': 'tb1q537qszkat926zukl5wcqd4u0t7wpstu47726za',
      'pubkey': Buffer.from('033cafdea75ea017e423f7d84fb518fd1b7b24ce68a24ca85453f2aebe82a6f356', 'hex'),
      'rawHex': '0200000000010170fc9234c00d0dfba982607c4fb23c0623273ec191206645c97db8acf6b44b7a0100000000ffffffff021027000000000000160014a47c080add5955a172dfa3b006d78f5f9c182f9543811b00000000001600140155c9010e05e47c772717b09108c3bbf02e1ec102483045022100985dba7c417783a98546a79ad64a067c24ff7135f2769cff98f87b7708f14fa3022023f623f261a3b1a74e3cc1994ae925383f4f5825b8ccc2e67d968b62a40ff168012102d2e00a03aec596470199d51f7bc3fca83f0c10813d06022a2cf6660fbe661a8300000000',
      'path': 'M/84\'/1\'/0\'/0/0'
    },
    {
      'txId': '8b94479487ea4d4f782a1be02fddddabe1105ee9e13d05d6db43d0e15372d0ac',
      'vout': 0,
      'value': 10000,
      'address': 'tb1q537qszkat926zukl5wcqd4u0t7wpstu47726za',
      'pubkey': Buffer.from('033cafdea75ea017e423f7d84fb518fd1b7b24ce68a24ca85453f2aebe82a6f356', 'hex'),
      'rawHex': '02000000000101432f1f37a59e901432dfa097d23991a5e08917464be4b0349488bfc16f3dec970100000000ffffffff021027000000000000160014a47c080add5955a172dfa3b006d78f5f9c182f9577c01b0000000000160014f0d6fd60bf60e0ffb789aea524996d2630b2ba2702473044022030d1a1bbc2dc674d172f45673255ec505fb0169b08d87a6e57cee94f7751a89502206c84ca70245ed10003a1b415d9776f9ed87254ca814b8a442c787355a65161320121030896a92f2c149908d987cb12f196a3b7c6c2cdaed9667a86e1b4f00252770b9500000000',
      'path': 'M/84\'/1\'/0\'/0/0'
    },
    {
      'txId': 'ab9764b44ead81281343f8e67cbcacef6ca96f65b7f7adcde24d6a4a96b4ad92',
      'vout': 0,
      'value': 10000,
      'address': 'tb1q537qszkat926zukl5wcqd4u0t7wpstu47726za',
      'pubkey': Buffer.from('033cafdea75ea017e423f7d84fb518fd1b7b24ce68a24ca85453f2aebe82a6f356', 'hex'),
      'rawHex': '02000000000101acd07253e1d043dbd6053de1e95e10e1abdddd2fe01b2a784f4dea879447948b0100000000ffffffff021027000000000000160014a47c080add5955a172dfa3b006d78f5f9c182f95bd781b00000000001600140155c9010e05e47c772717b09108c3bbf02e1ec10247304402202672f991848b3cfa4a8576504ef438cb45d25f0524e1ffdb552d15e99dab0d72022028cbd67fc106b4cd90ee6c758e67c3ed0232ad7acd9c6617dfd273a7ba32716b012102d585e41e7bfdc6f9c802d49118aef528735b872d1e0c746ee4bbd3428776c6b700000000',
      'path': 'M/84\'/1\'/0\'/0/0'
    }
  ],
  outputs: [
    {
      'address': 'tb1qzx5s7fkvuwl2d2z246aemv4knjvuh2yhygncy7',
      'value': 10000
    }
  ]
};

export const p2shSendInfo = {
  scriptType: BitcoinScriptType.P2SH_P2WPKH,
  sendInfo: {
    masterFingerprint: Buffer.from('9ad305ed', 'hex'),
    changeAddress: '2N7MCzF8B9gX6eqDduJmLQgNDQiHFTsPd6r',
    changeAddressPath: 'M/49\'/1\'/0\'/1/0',
    changeAddressPubkey: Buffer.from('0238ffe4e107272a3d10bf77c42210b6a242a7854f540038fd620b975217004abe', 'hex'),
  },
  network: BitcoinNetwork.Test,
  inputs: [
    {
      'txId': '397a5284710a3e6ad24b22640a338fa9b46e3fc279875acfb2d9a0bfb51bb718',
      'vout': 0,
      'value': 200000,
      'address': '2N33C1SAivuLM71EUwZ2McK61P34wpsR1DY',
      'pubkey': Buffer.from('0214aa7e6493115c92c5ae3d325a6f0f6d371df99ed4e0b5c4f25d263f8f13e308', 'hex'),
      'rawHex': '020000000001017fb14133c5be529f15b0277f912cb6ec5cd30bd4a34532cbfecf446339c90b820000000000ffffffff02400d03000000000017a9146b6a9d040b8ec006bb5eef53d607d97e99e2d45b87cd5b1300000000001600140b28f9d2106929c8bf0c18222275ef08bf746a4402483045022100c6878c3ac80650d6fb2694830ec4f51149f94e8e9d39c02bff993740aa4f9d8402203b11e96fad3330f6dbf3ca0fbd0d7d4c0248c94879b2df4afe174a4bbe54e25e0121022776440719a06a62fbf3e0a4675092152ae95392e4b63c80d137542932c82a3500000000',
      'path': 'M/49\'/1\'/0\'/0/0'
    }
  ],
  outputs: [
    {
      'address': 'tb1qzx5s7fkvuwl2d2z246aemv4knjvuh2yhygncy7',
      'value': 50000
    },
    {
      'value': 142768
    }
  ]
};

export const p2pkhSendInfo = {
  scriptType: BitcoinScriptType.P2PKH,
  sendInfo: {
    masterFingerprint: Buffer.from('9ad305ed', 'hex'),
    changeAddress: 'mjeafqTFMKNt3hM3LZmKd8it6gYshsLSFt',
    changeAddressPath: 'M/44\'/1\'/0\'/1/0',
    changeAddressPubkey: Buffer.from('0238abaec95bd24d8fa1c124138831c2ba7b06ff11739c08b69dc73adee5d452c0', 'hex'),
  },
  network: BitcoinNetwork.Test,
  inputs: [
    {
      'txId': '12374c4af02f8ec11676869f1c82eeb7416487ed67f71481db2abf6a9a094b0e',
      'vout': 0,
      'value': 200000,
      'address': 'n1SmxTPe9Z5hZiRs96LQMv6MVswXNrxZhL',
      'pubkey': Buffer.from('035bd1fd7787c5b1a5995083ce714b7af489996f9fcd1921248c84260f88eb1cc6', 'hex'),
      'rawHex': '0200000000010118b71bb5bfa0d9b2cf5a8779c23f6eb4a98f330a64224bd26a3e0a7184527a390100000000ffffffff02400d0300000000001976a914da9838e10e66758fd92dc0d95e2e57dd22da8e2a88ac4d321000000000001600149f3c91904ccbf66bf6f102935564646acdb86a6202483045022100e0386d7a577059848abaea2a3a976595af0bd6a4843ac7b21343d9b366704b1e02201fe3be96edf9aff84d2c0314b73252d33c23f112c5a73c787ee47d254e697277012102a08ef70e9149b47ceecf69cd36dba3c8a30c020b5c3d650ad78525555d65bd0500000000',
      'path': 'M/44\'/1\'/0\'/0/1'
    }
  ],
  outputs: [
    {
      'address': 'tb1qzx5s7fkvuwl2d2z246aemv4knjvuh2yhygncy7',
      'value': 60000
    },
    {
      'value': 132768
    }
  ]
};

export const p2pkhSelectInfo = {
  inputs: [
    {
      'transactionHash': '12374c4af02f8ec11676869f1c82eeb7416487ed67f71481db2abf6a9a094b0e',
      'index': 0,
      'value': 200000,
      'address': 'n1SmxTPe9Z5hZiRs96LQMv6MVswXNrxZhL',
      'pubkey': Buffer.from('035bd1fd7787c5b1a5995083ce714b7af489996f9fcd1921248c84260f88eb1cc6', 'hex'),
      'rawHex': '0200000000010118b71bb5bfa0d9b2cf5a8779c23f6eb4a98f330a64224bd26a3e0a7184527a390100000000ffffffff02400d0300000000001976a914da9838e10e66758fd92dc0d95e2e57dd22da8e2a88ac4d321000000000001600149f3c91904ccbf66bf6f102935564646acdb86a6202483045022100e0386d7a577059848abaea2a3a976595af0bd6a4843ac7b21343d9b366704b1e02201fe3be96edf9aff84d2c0314b73252d33c23f112c5a73c787ee47d254e697277012102a08ef70e9149b47ceecf69cd36dba3c8a30c020b5c3d650ad78525555d65bd0500000000',
      'path': 'M/44\'/1\'/0\'/0/1'
    }
  ],
};
