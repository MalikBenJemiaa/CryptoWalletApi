const ser = require("express");
const dotenv = require("dotenv");
dotenv.config();
const transaction = require("./controller/transction");
const getAccounts = require("./controller/getAccounts_C");
const getBalance = require("./controller/getBalance");

// Load environment variables from .env file
const app = ser();
const auth = require("./controller/auth");
const words = require("./controller/words");
app.use("/auth", auth);
app.use("/words", words);
app.use("/web3", transaction._router);
app.use("/get", getAccounts._router);
app.use("/get", getBalance._router);
app.listen(parseInt(process.env.PORT), () => {
  console.log("server running in post 3000");
});
