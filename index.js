const ser = require("express");
const dotenv = require("dotenv");
dotenv.config();
const transaction = require("./controller/transction");
// Load environment variables from .env file
const app = ser();
const auth = require("./controller/auth");
const words = require("./controller/words");
app.use("/auth", auth);
app.use("/words", words);
app.use("/web3", transaction._router);
app.listen(parseInt(process.env.PORT), () => {
  console.log("server running in post 3000");
});
