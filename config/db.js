const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",

  database: "myveda-db",
  port: "3306",
});

module.exports = db;
