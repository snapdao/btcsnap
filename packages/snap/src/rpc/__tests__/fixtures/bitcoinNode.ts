import { SLIP10Node } from "interface";

// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

export const bip44AccountNode: SLIP10Node = {
  chainCode: "af0894dc5f2d5bed0dc85b2fd2053a98575765c144e4e64126ee1009b38860b2",
  curve: "secp256k1",
  depth: 2,
  index: 2147483648,
  parentFingerprint: 358337113,
  privateKey: "a7661fa497f67a7d5a17f299e76635e16d69aca8b89ac8022cabad47690f47f6",
  publicKey: "03f72f0e3684b0d7295f391616f12a469070bfcd175c55366239047495a2c1c410"
}

export const bip44 = {
  slip10Node: bip44AccountNode,
  xpub: "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj"
}
