const jwt = require("jsonwebtoken");
// const process = require("dotenv");
const dotenv = require("dotenv");
dotenv.config();
serctKey = process.env.SECRET_KEY;
check_token = (token) => {
  return new Promise((resolve, reject) => {
    // console.log(token);
    jwt.verify(token, serctKey, (err, data) => {
      if (err) {
        console.log(err.message);
        reject(err.message);
      }
      resolve(data);
    });
  });
};
module.exports = { check_token };
