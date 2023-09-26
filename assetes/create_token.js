// const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
create_hash = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    var token;
    try {
      token = await jwt.sign(data[0], secretKey);
    } catch (e) {
      console.log(e);
      reject(e);
    }
    resolve(token);
  });
};
module.exports = {
  create_hash,
};
