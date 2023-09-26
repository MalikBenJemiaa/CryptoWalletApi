const app = require("express");
const jwt = require("../assetes/check_token");
const blockchain = require("../web3/sendTransaction");
const check_blockchain = require("../web3/Account_check");
const ser = app();
ser.use(app.json());
ser.post(
  "/sendTransation",
  (req, res, next) => {
    check_blockchain
      .check_address(req.body.to)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(403).json({
          msg: "can not find the account of the receiver",
        });
      });
  },
  (req, res, next) => {
    jwt
      .check_token(req.headers.token)
      .then((data) => {
        check_blockchain
          .check_address(data.Address)
          .then(() => {
            next();
          })
          .catch(() => {
            res.status(403).json({
              msg: "can not find the account of the sneder",
            });
          });
      })
      .catch((e) => {
        res.status(403).json({
          msg: e,
          raison: "invalid token",
        });
      });
  },
  (req, res, next) => {
    jwt
      .check_token(req.headers.token)
      .then((data) => {
        check_blockchain
          .check_balance(data.Address, req.body.amount)
          .then(() => {
            next();
          })
          .catch(() => {
            res.status(403).json({
              msg: "insufficient balance",
            });
          });
      })
      .catch((e) => {
        res.status(403).json({
          msg: e,
          raison: "invalid token",
        });
      });
  },
  (req, res) => {
    jwt
      .check_token(req.headers.token)
      .then((data) => {
        blockchain
          .sendTransation(data.Address, req.body.to, req.body.amount)
          .then((r) => {
            res.status(200).json({
              msg: "operation affected",
              response: r,
            });
          })
          .catch((e) => {
            res.status(300).json({
              msg: "operation not affected",
            });
          });
      })
      .catch((e) => {
        res.status(304).json({
          msg: "error authentification",
        });
      });
  }
);
module.exports = ser;
