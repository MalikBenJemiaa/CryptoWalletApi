const app = require("express");
const ser = app();
const Web3GetAccounts = require("../web3/getAccounts");
ser.get("/getAccounts", (req, res) => {
  Web3GetAccounts.getAccounts()
    .then((accounts) => {
      res.status(200).json({
        accounts: accounts,
        msg: "operation affected with success",
      });
    })
    .catch((e) => {
      res.status(502).json({
        error: e,
        msg: "error to get the accounts",
      });
    });
});
module.exports = ser;
