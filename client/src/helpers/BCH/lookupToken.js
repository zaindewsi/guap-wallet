import bchjs from "./network";

export const lookupToken = async (TOKENID) => {
  try {
    const properties = await bchjs.SLP.Utils.list(TOKENID);
    // console.log(properties);
    return properties.name;
  } catch (err) {
    console.error("Error in lookupToken: ", err);
    throw err;
  }
};
