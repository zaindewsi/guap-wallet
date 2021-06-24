const express = require("express");
const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send({ server: "Crypto Wallet API Server" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
