import bchjs from "./network";

// Generate a change address from a Mnemonic of a private key.
export const changeAddrFromMnemonic = async (seed) => {
  // root seed buffer
  const rootSeed = await bchjs.Mnemonic.toSeed(seed);
  // master HDNode
  let masterHDNode = bchjs.HDNode.fromSeed(rootSeed);
  // HDNode of BIP44 account
  const account = bchjs.HDNode.derivePath(masterHDNode, "m/44'/245'/0'");

  // derive the first external change address HDNode which is going to spend utxo
  const change = bchjs.HDNode.derivePath(account, "0/0");
  return change;
};
