const db = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const db_credit = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  query_timeout: 600,
  database: process.env.DATABASE,
  // user: "postgres",
  // password: "123456",
  // host: "localhost",
  // port: 5432,
  // query_timeout: 600,
  // database: "Wallets",
};
var client;
database_connection = async () => {
  try {
    client = await new db.Client(db_credit);
  } catch (e) {
    console.log("connetion to db failled");
    console.log(e);
  }
  await client.connect();
  console.log("Postgres database connetion established");
};
database_connection();

check_username_password = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'SELECT "ID", "Address", "AccWord", "Username", "Password" FROM public.accounts WHERE "Username"= $1 AND "Password"= $2 ;',
      values: [username, password],
    };

    try {
      result = await client.query(query.text, query.values);
    } catch (e) {
      console.log(e);
      reject(e);
    }
    if (result.rows.length == 0) {
      reject("account do not exist");
    }
    resolve(result);
  });
};
auth_with_words = (words) => {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'SELECT "ID", "Address", "AccWord", "Username", "Password" FROM public.accounts WHERE "AccWord"= $1  ;',
      values: [words],
    };
    var result = await client.query(query.text, query.values);
    if (result.rowCount == 0) {
      reject("opreation do not affected");
    }
    resolve(result.rows);
  });
};
module.exports = { auth_with_words, check_username_password };
