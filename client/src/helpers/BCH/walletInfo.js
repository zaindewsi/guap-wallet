import bchjs from "./network";

export const walletInfo = async (cashAddr) => {
  const outObj = {};
  try {
    // get the cash address
    const slpAddress = bchjs.SLP.Address.toSLPAddress(cashAddr);
    // first get BCH balance
    const balance = await bchjs.Electrumx.balance(cashAddr);
    const satBalance =
      Number(balance.balance.confirmed) + Number(balance.balance.unconfirmed);
    const bchBalance = bchjs.BitcoinCash.toBitcoinCash(satBalance);
    outObj.satBalance = satBalance;
    outObj.balance = bchBalance;
    // get token balances
    try {
      const tokens = await bchjs.SLP.Utils.balancesForAddress(slpAddress);
      outObj.tokens = tokens;
    } catch (error) {
      if (error.message === "Address not found")
        console.log("No tokens found.");
      else console.log("Error: ", error);
    }
    return outObj;
  } catch (err) {
    console.error("Error in getBalance: ", err);
    console.log(`Error message: ${err.message}`);
    throw err;
  }
};
