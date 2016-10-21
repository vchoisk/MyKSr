
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "Myksr",
  user: "root",
  password: "",
  database: "myksr"
});

db.connect((err) => {
  if(err){
    console.log('Connection to db failed!');
    console.error(err);
    return;
  }
  console.log('Connection to db established!');
});

module.exports = db;
