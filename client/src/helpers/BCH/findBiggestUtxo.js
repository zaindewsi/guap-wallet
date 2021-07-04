import bchjs from "./network";
// Returns the utxo with the biggest balance from an array of utxos.
export const findBiggestUtxo = async (utxos) => {
  let largestAmount = 0;
  let largestIndex = 0;

  for (var i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i];
    // console.log(`thisUTXO: ${JSON.stringify(thisUtxo, null, 2)}`);

    // Validate the UTXO data with the full node.
    const txout = await bchjs.Blockchain.getTxOut(
      thisUtxo.tx_hash,
      thisUtxo.tx_pos
    );
    if (txout === null) {
      // If the UTXO has already been spent, the full node will respond with null.
      console.log(
        "Stale UTXO found. You may need to wait for the indexer to catch up."
      );
      continue;
    }

    if (thisUtxo.value > largestAmount) {
      largestAmount = thisUtxo.value;
      largestIndex = i;
    }
  }

  return utxos[largestIndex];
};
