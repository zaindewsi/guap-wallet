import bchjs from "./network";

export const restoreWallet = async (seed) => {
  const outObj = {};
  // create 128 bit BIP39 mnemonic
  const mnemonic = seed;
  outObj.mnemonic = mnemonic;
  // root seed buffer
  const rootSeed = await bchjs.Mnemonic.toSeed(mnemonic);
  // master HDNode
  let masterHDNode = bchjs.HDNode.fromSeed(rootSeed);
  // HDNode of BIP44 account
  const account = bchjs.HDNode.derivePath(masterHDNode, "m/44'/245'/0'");
  for (let i = 0; i <= 1; i++) {
    const childNode = masterHDNode.derivePath(`m/44'/245'/0'/0/${i}`);
    if (i === 0) {
      outObj.cashAddress = bchjs.HDNode.toCashAddress(childNode);
      outObj.WIF = bchjs.HDNode.toWIF(childNode);
      outObj.slpAddress = bchjs.SLP.Address.toSLPAddress(outObj.cashAddress);
      outObj.legacyAddress = bchjs.Address.toLegacyAddress(outObj.cashAddress);
    }
  }

  // derive the first external change address HDNode which is going to spend utxo
  const change = bchjs.HDNode.derivePath(account, "0/0");
  // get the cash address
  bchjs.HDNode.toCashAddress(change);
  // Get the legacy address.
  // console.log(outObj);
  return outObj;
};
