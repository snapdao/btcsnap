import { SLIP10Node } from "interface";

// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

export const bip44AccountNode: SLIP10Node = {
  chainCode: "af0894dc5f2d5bed0dc85b2fd2053a98575765c144e4e64126ee1009b38860b2",
  curve: "secp256k1",
  depth: 2,
  index: 2147483648,
  parentFingerprint: 358337113,
  masterFingerprint: 1942346250,
  privateKey: "a7661fa497f67a7d5a17f299e76635e16d69aca8b89ac8022cabad47690f47f6",
  publicKey: "03f72f0e3684b0d7295f391616f12a469070bfcd175c55366239047495a2c1c410"
}

export const bip44 = {
  slip10Node: bip44AccountNode,
  xpub: "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj"
}

export const LNDataFromSnap = {
  lightning: {
    id00000001: {
      credential: "U2FsdGVkX1+2LDCSQfLhQ6NFbqWn2pVk0t0snVYXEof07w8kRUHOffJ6X5ocK3Ox",
      password: "ln_password_1"
    }
  }
}

export const LNDataToSnap = {
   domain : 'www.justsnap.io',
   walletId: "id00000001",
   credential: "testAdmin:123456",
   password: "testPassword",
   invoice: "lnbc100u1p34k6pppp5332v7z238qt7jrhjz5mkhckdx2uuc50d8xzpfyanj8p3plav9z5sdq8w3jhxaqcqzpgxqyz5vqsp5stj40j57779ahamqp9p3rpq0eudt75f9kxw7yyhuwwaxfmuqsqzq9qyyssqqudc8qc5np9rj5ypn6p9jlafn5sc02nwp60at38cwem4ycz9p9pqdlknk5k3yfayh3pzhndjt2gev8g4rqtnr6art5cagr2c0f3xkxqqfx27k5"
}

export const LNSignature = {
  signature: "1f9b311f576424fe87c769ab9146f6b3613399b0b54f13b781639b2bc3f40e22706012192cdcdaa9830b5a21494e54740cfcec3b1e7f75d35e1c9afeb143d5c1ed"
}
