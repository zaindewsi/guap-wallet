export default function AboutUs() {
  return (
    <>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Guap!</strong>
      </p>
      <br></br>
      <p>We are a BCH/SLP based non-custodial web wallet.</p>

      <p>
        This wallet is only as secure as the device it runs on. Please do not
        store large amounts of funds
      </p>
      <p>
        The code for this wallet can be found at Github. It uses the
        minimal-slp-wallet engine and React.js
      </p>
      <p>
        When a transaction is made with this wallet, an output of 2000 satoshis
        is added. This is a convenience fee that goes towards burning PSF
        tokens. It helps support the developers who work on software sponsored
        by the Permissionless Software Foundation.
      </p>
    </>
  );
}
