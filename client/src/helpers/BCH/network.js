import BCHJS from "@psf/bch-js";
// REST API servers.
const BCHN_MAINNET = "https://bchn.fullstack.cash/v4/";
// Instantiate bch-js based on the network.
let bchjs = new BCHJS({ restURL: BCHN_MAINNET });

export default bchjs;
