const app = require("express");
const model = require("../model/auth_model");
const jwt = require("../assetes/create_token");
const ser = app();
ser.use(app.json());
ser.post("/enter", async (req, res) => {
  await model
    .check_username_password(req.body.username, req.body.password)
    .then((r) => {
      jwt
        .create_hash(r.rows)
        .then((token) => {
          res
            .status(300)
            .json({ msg: "success", data: r.rows[0], token: token });
        })
        .catch((e) => {
          res
            .status(350)
            .json({ msg: "System error try again or lately", data: req.body });
        });
    })
    .catch((e) => {
      res.status(300).json({ msg: "account not exist", data: req.body });
    });
});
ser.post(
  "/loginWithWords",
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
    model
      .auth_with_words(req.body.words)
      .then((dataF) => {
        jwt
          .create_hash(dataF)
          .then((token) => {
            res.status(200).json({
              msg: "operation affected with success",
              Token: token,
            });
          })
          .catch(() => {
            res
              .status(350)
              .json({
                msg: "System error try again or lately",
                data: req.body,
              });
          });
      })
      .catch((e) => {
        res.status(350).json({
          msg: "data not fitshed",
        });
      });
  }
);
module.exports = ser;
