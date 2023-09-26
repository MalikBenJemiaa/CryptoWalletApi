// const { send } = require("express/lib/response");
const Web3 = require("web3");
var web3;
// const dotenv = require("dotenv");
// dotenv.config();
try {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
} catch (e) {
  console.log(e);
}
// console.log(process.env);
sendTransation = (from, to, amount) => {
  return new Promise(async (resolve, reject) => {
    // console.log(from);
    // console.log(to);
    var b;
    try {
      b = await web3.eth.sendTransaction({
        from: from,
        to: to,
        value: await web3.utils.toWei(amount, "ether"),
      });
    } catch (e) {
      reject(e);
    }
    resolve(b);
  });
};
module.exports = {
  sendTransation,
};
