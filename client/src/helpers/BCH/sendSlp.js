import bchjs from "./network";
import { walletInfo } from "./walletInfo";
import { changeAddrFromMnemonic } from "./changeAddrFromMnemonic";
import { findBiggestUtxo } from "./findBiggestUtxo";
import { transactionStatus } from "./util";

export const sendToken = async (cashAddr, tknQty, tknId, recvSlpAddr) => {
  try {
    const fullBalance = await walletInfo(cashAddr);
    const mnemonic = fullBalance.mnemonic;
    const change = await changeAddrFromMnemonic(mnemonic);

    // Generate an EC key pair for signing the transaction.
    const keyPair = bchjs.HDNode.toKeyPair(change);
    const slpAddress = bchjs.HDNode.toSLPAddress(change);

    // Get UTXOs held by this address.
    const data = await bchjs.Electrumx.utxo(cashAddr);
    const utxos = data.utxos;
    console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`);
    if (utxos.length === 0) throw new Error("No UTXOs to spend! Exiting.");

    // Identify the SLP token UTXOs.
    let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
    console.log(`tokenUtxos: ${JSON.stringify(tokenUtxos, null, 2)}`);

    // Filter out the non-SLP token UTXOs.
    const bchUtxos = utxos.filter((utxo, index) => {
      const tokenUtxo = tokenUtxos[index];
      if (!tokenUtxo.isValid) return true;
    });
    console.log(`bchUTXOs: ${JSON.stringify(bchUtxos, null, 2)}`);
    if (bchUtxos.length === 0) {
      throw new Error("Wallet does not have a BCH UTXO to pay miner fees.");
    }

    // Filter out the token UTXOs that match the user-provided token ID.
    tokenUtxos = tokenUtxos.filter((utxo, index) => {
      if (
        utxo && // UTXO is associated with a token.
        utxo.tokenId === tknId && // UTXO matches the token ID.
        utxo.utxoType === "token" // UTXO is not a minting baton.
      ) {
        return true;
      }
    });
    if (tokenUtxos.length === 0) {
      throw new Error("No token UTXOs for the specified token could be found.");
    }

    // Choose a UTXO to pay for the transaction.
    const bchUtxo = findBiggestUtxo(bchUtxos);
    // Generate the OP_RETURN code.
    const slpSendObj = bchjs.SLP.TokenType1.generateSendOpReturn(
      tokenUtxos,
      tknQty
    );
    const slpData = slpSendObj.script;

    // BEGIN transaction construction.
    // instance of transaction builder
    let transactionBuilder = new bchjs.TransactionBuilder();

    // Add the BCH UTXO as input to pay for the transaction.
    const originalAmount = bchUtxo.value;
    transactionBuilder.addInput(bchUtxo.tx_hash, bchUtxo.tx_pos);
    // add each token UTXO as an input.
    for (let i = 0; i < tokenUtxos.length; i++) {
      transactionBuilder.addInput(tokenUtxos[i].tx_hash, tokenUtxos[i].tx_pos);
    }
    // get byte count to calculate fee. paying 1 sat
    // Note: This may not be totally accurate. Just guessing on the byteCount size.
    const byteCount = bchjs.BitcoinCash.getByteCount(
      { P2PKH: 3 },
      { P2PKH: 5 }
    );
    const satoshisPerByte = 1.2;
    const txFee = Math.floor(satoshisPerByte * byteCount);
    console.log(`Transaction fee: ${txFee}`);

    // amount to send back to the sending address. It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - txFee - 546 * 2;
    if (remainder < 1) {
      throw new Error("Selected UTXO does not have enough satoshis");
    }

    // Add OP_RETURN as first output.
    transactionBuilder.addOutput(slpData, 0);
    // Send the token back to the same wallet if the user hasn't specified a
    // different address.
    if (recvSlpAddr === "") recvSlpAddr = slpAddress;

    // Send dust transaction representing tokens being sent.
    transactionBuilder.addOutput(
      bchjs.SLP.Address.toLegacyAddress(recvSlpAddr),
      546
    );

    // Return any token change back to the sender.
    if (slpSendObj.outputs > 1) {
      transactionBuilder.addOutput(
        bchjs.SLP.Address.toLegacyAddress(slpAddress),
        546
      );
    }

    // Last output: send the BCH change back to the wallet.
    transactionBuilder.addOutput(
      bchjs.Address.toLegacyAddress(cashAddr),
      remainder
    );

    // Sign the transaction with the private key for the BCH UTXO paying the fees.
    let redeemScript;
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      originalAmount
    );

    // Sign each token UTXO being consumed.
    for (let i = 0; i < tokenUtxos.length; i++) {
      const thisUtxo = tokenUtxos[i];
      transactionBuilder.sign(
        1 + i,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        thisUtxo.value
      );
    }

    // build tx
    const tx = transactionBuilder.build();
    // output rawhex
    const hex = tx.toHex();
    // END transaction construction.
    // Broadcast transation to the network
    const txidStr = await bchjs.RawTransactions.sendRawTransaction([hex]);
    console.log(`Transaction ID: ${txidStr}`);
    console.log("Check the status of your transaction on this block explorer:");
    transactionStatus(txidStr, "mainnet");
  } catch (err) {
    console.error("Error in sendToken: ", err);
    console.log(`Error message: ${err.message}`);
  }
};
