import BCHJS from "@psf/bch-js";
import JwtLib from "jwt-bch-lib";

const jwtLib = new JwtLib({
  login: process.env.REACT_APP_FULLSTACKLOGIN,
  password: process.env.REACT_APP_FULLSTACKPASS,
});

export default async function start() {
  // Log into the auth server and get the JWT token.
  await jwtLib.register();
  const apiToken = jwtLib.userData.apiToken;
  const bchjs = new BCHJS({ apiToken });
  return bchjs;
}

start();
