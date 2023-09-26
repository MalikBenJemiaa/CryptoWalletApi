const { query } = require("express");
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
insert_the_words = (word, data) => {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'UPDATE public.accounts SET "AccWord" = $1  WHERE "ID" = $2 ;',
      values: [word, data],
    };
    try {
      var result = await client.query(query.text, query.values);
    } catch (e) {
      reject(e.message);
    }
    // rowCount: 0,
    if (result.rowCount == 0) {
      reject("opreation do not affected");
    }
    resolve(result);
  });
};
module.exports = { insert_the_words };
