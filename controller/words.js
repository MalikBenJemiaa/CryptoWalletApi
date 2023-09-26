const express = require("express");
const assetes = require("../assetes/check_token");
const model = require("../model/auth_model");
const model_word = require("../model/insert12_words");
const app = express();
app.use(express.json());

app.post(
  "/generate",
  (req, res, next) => {
    var spaceCount = (req.body.words.match(/ /g) || []).length;
    if (spaceCount === 11) {
      next();
    } else {
      res.status(400).json({
        msg: "incorrect input",
      });
    }
  },
  (req, res) => {
    assetes
      .check_token(req.headers.token)
      .then((data) => {
        model
          .check_username_password(data.Username, data.Password)
          .then((dataFitshed) => {
            model_word
              .insert_the_words(req.body.words, dataFitshed.rows[0].ID)
              .then((data) => {
                res.status(200).json({
                  token: req.headers.token,
                  msg: "success, data inserted",
                });
              })
              .catch((e) => {
                res.status(300).json({
                  token: req.headers.token,
                  error: e,
                  msg: "Failed",
                  raison: "Database sustem error",
                });
              });
          })
          .catch((e) => {
            res.status(403).json({
              token: req.headers.token,
              error: e.message,
              msg: "Failed",
            });
          });
      })
      .catch((e) => {
        res.status(403).json({
          token: req.headers.token,
          error: e,
          msg: "Failed",
        });
      });
  }
);
module.exports = app;
