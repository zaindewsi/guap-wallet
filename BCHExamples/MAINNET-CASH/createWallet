const mainnet = require("mainnet-js");
const bchaddr = require("bchaddrjs");
const toLegacyAddress = bchaddr.toLegacyAddress;
const toBitpayAddress = bchaddr.toBitpayAddress;
const toCashAddress = bchaddr.toCashAddress;
process.env.DATABASE_URL = "anon";

const getWallet = async () => {
  let outStr = "";
  const outObj = {};
  try {
    const wallet = await mainnet.Wallet.slp.named("Jett");
    const mnemonic = wallet.mnemonic;
    const cashAddr = wallet.cashaddr;
    const legacyAddr = toLegacyAddress(cashAddr);
    const slpAddr = wallet.slp.getDepositAddress();
    console.log(wallet);
  } catch (err) {
    console.error(err);
  }
};

getWallet();
