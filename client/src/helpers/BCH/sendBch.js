import bchjs from "./network";
import { walletInfo } from "./walletInfo";

// Replace the address below with the address you want to send the BCH to.
let RECV_ADDR = "user input as bitcoincash:xxxxxxxxxxx here";
// set satoshi amount to send
const SATOSHIS_TO_SEND = "user input as num here";

async function sendBch(cashAddr, seed) {
  try {
    // Get the balance of the sending address.
    const fullBalance = await walletInfo(cashAddr);
    console.log(
      `Balance of sending address ${cashAddr} is ${fullBalance.balance} BCH.`
    );

    // Exit if the balance is zero.
    if (fullBalance.balance <= 0.0) {
      console.log("Balance of sending address is zero. Exiting.");
      process.exit(0);
    }

    // If the user fails to specify a reciever address, just send the BCH back
    // to the origination address, so the example doesn't fail.
    if (RECV_ADDR === "") RECV_ADDR = cashAddr;

    // Get UTXOs held by the address.
    // https://github.com/Bitcoin-com/mastering-bitcoin-cash/blob/master/4-transactions.md
    const utxos = await bchjs.Electrumx.utxo(cashAddr);
    if (utxos.utxos.length === 0) throw new Error("No UTXOs found.");
    const utxo = await findBiggestUtxo(utxos.utxos);

    // instance of transaction builder
    let transactionBuilder = new bchjs.TransactionBuilder();
    // Essential variables of a transaction.
    const satoshisToSend = SATOSHIS_TO_SEND;
    const originalAmount = utxo.value;
    const vout = utxo.tx_pos;
    const txid = utxo.tx_hash;

    // add input with txid and index of vout
    transactionBuilder.addInput(txid, vout);

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = bchjs.BitcoinCash.getByteCount(
      { P2PKH: 1 },
      { P2PKH: 2 }
    );
    const satoshisPerByte = 1.2;
    const txFee = Math.floor(satoshisPerByte * byteCount);

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - txFee;
    if (remainder < 0) {
      throw new Error("Not enough BCH to complete transaction!");
    }

    // add output w/ address and amount to send
    transactionBuilder.addOutput(RECV_ADDR, satoshisToSend);
    transactionBuilder.addOutput(cashAddr, remainder);

    // Generate a change address from a Mnemonic of a private key.
    const change = await changeAddrFromMnemonic(seed);

    // Generate a keypair from the change address.
    const keyPair = bchjs.HDNode.toKeyPair(change);

    // Sign the transaction with the HD node.
    let redeemScript;
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      originalAmount
    );

    // build tx
    const tx = transactionBuilder.build();
    // output rawhex
    const hex = tx.toHex();
    // console.log(`TX hex: ${hex}`);

    // Broadcast transation to the network
    const txidStr = await bchjs.RawTransactions.sendRawTransaction([hex]);
    // import from util.js file
    const util = require("../util.js");
    console.log(`Transaction ID: ${txidStr}`);
    console.log("Check the status of your transaction on this block explorer:");
    util.transactionStatus(txidStr, "mainnet");
  } catch (err) {
    console.log("error: ", err);
  }
}
sendBch();

// Generate a change address from a Mnemonic of a private key.
async function changeAddrFromMnemonic(seed) {
  // root seed buffer
  const rootSeed = await bchjs.Mnemonic.toSeed(seed);
  // master HDNode
  let masterHDNode = bchjs.HDNode.fromSeed(rootSeed);
  // HDNode of BIP44 account
  const account = bchjs.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

  // derive the first external change address HDNode which is going to spend utxo
  const change = bchjs.HDNode.derivePath(account, "0/0");
  return change;
}

// Returns the utxo with the biggest balance from an array of utxos.
async function findBiggestUtxo(utxos) {
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
}
