const app = require("express");
const jwt = require("../assetes/check_token");
const web3 = require("../web3/getBalance");

const ser = app();
ser.use(app.json());
ser.get("/getBalance", (req, res) => {
  //   console.log(req.headers.token);
  jwt
    .check_token(req.headers.token)
    .then((data) => {
      web3
        .getBalance(data.Address)
        .then((balance) => {
          res.status(200).json({
            data: data,
            balance: balance,
            msg: "operation affected with success",
          });
        })
        .catch((err) => {
          res.status(502).json({
            error: err,
            msg: "failed to get the balance",
          });
        });
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
        msg: "authentification error",
      });
    });
});
module.exports = ser;
