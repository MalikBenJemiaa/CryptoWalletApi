const Web3 = require("web3");
const { checkout } = require("../controller/words");
var web3;
// const dotenv = require("dotenv");
// dotenv.config();
try {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
} catch (e) {
  console.log(e);
}

check_address = (ad) => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts().then((accounts) => {
      if (accounts.includes(ad)) {
        resolve();
      }
      {
        reject();
      }
    });
  });
};
check_balance = (ad, amount) => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth.getBalance(ad).then(async (balance) => {
        let am = await web3.utils.toWei(amount, "ether");
        if (parseInt(balance) >= parseInt(am)) {
          resolve();
        } else {
          reject();
        }
      });
    } catch (e) {
      reject("system error try again or lately");
    }
  });
};
module.exports = {
  check_address,
  check_balance,
};
