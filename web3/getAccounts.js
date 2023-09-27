const Web3 = require("web3");
var web3;
// const dotenv = require("dotenv");
// dotenv.config();
try {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
} catch (e) {
  console.log(e);
}
getAccounts = () => {
  return new Promise((resolve, reject) => {
    try {
      web3.eth
        .getAccounts()
        .then((Accounts) => {
          resolve(Accounts);
        })
        .catch((e) => {
          reject(e.message);
        });
    } catch (e) {
      reject("can not fitsh the address of the accounts");
    }
  });
};
module.exports = {
  getAccounts,
};
