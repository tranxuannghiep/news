const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Anhnghiep1",
  database: "mybooks",
});

module.exports = pool;
