import bchjs from "./network";
import { walletInfo } from "./walletInfo";
import { changeAddrFromMnemonic } from "./changeAddrFromMnemonic";
import { findBiggestUtxo } from "./findBiggestUtxo";
import { transactionStatus } from "./util";

export const sendBch = async (cashAddr, RECV_ADDR, satoshisToSend) => {
  try {
    // Get the balance of the sending address.
    const fullBalance = await walletInfo(cashAddr);
    const seed = fullBalance.mnemonic;
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

    const SEND_ADDR_LEGACY = bchjs.Address.toLegacyAddress(cashAddr);
    const RECV_ADDR_LEGACY = bchjs.Address.toLegacyAddress(RECV_ADDR);
    console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`);
    console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`);

    // Get UTXOs held by the address.
    // https://github.com/Bitcoin-com/mastering-bitcoin-cash/blob/master/4-transactions.md
    const utxos = await bchjs.Electrumx.utxo(cashAddr);
    console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`);
    if (utxos.utxos.length === 0) throw new Error("No UTXOs found.");
    const utxo = await findBiggestUtxo(utxos.utxos);

    // instance of transaction builder
    let transactionBuilder = new bchjs.TransactionBuilder();
    // Essential variables of a transaction.
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
    console.log(`Transaction byte count: ${byteCount}`);
    const satoshisPerByte = 1.2;
    const txFee = Math.floor(satoshisPerByte * byteCount);
    console.log(`Transaction fee: ${txFee}`);

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
    console.log(`TX hex: ${hex}`);

    // Broadcast transation to the network
    const txidStr = await bchjs.RawTransactions.sendRawTransaction([hex]);
    console.log(`Transaction ID: ${txidStr}`);
    console.log("Check the status of your transaction on this block explorer:");
    transactionStatus(txidStr, "mainnet");
  } catch (err) {
    console.log("error: ", err);
  }
};
