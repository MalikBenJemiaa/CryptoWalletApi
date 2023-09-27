const Web3 = require("web3");
var web3;
// const dotenv = require("dotenv");
// dotenv.config();
try {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
} catch (e) {
  console.log(e);
}
getBalance = (ad) => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth
        .getBalance(ad)
        .then(async (balance) => {
          resolve(await web3.utils.fromWei(balance, "ether"));
        })
        .catch((err) => {
          reject(err.message);
        });
    } catch (e) {
      reject(e.message);
    }
  });
};
module.exports = { getBalance };
