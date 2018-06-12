const mysql = require('mysql');

const dbCon = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "testdb"
});

function generateTokan(str) {
  return Buffer.from(str).toString('base64');
}

function createUserTable() {
  let sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255), passport VARCHAR(255))";
  dbCon.query( sql, ( err, result ) => {
      if ( err )
        return false;
      return true;
  } );
}

exports.isUserDataExists = function() {
  let sql = "SELECT * FROM users";
  dbCon.query( sql, ( err, result ) => {
      if ( err )
        createUserTable();
      return true;
  } );
}

exports.isUserExists = function(email, password) {
  let isUser, token = generateTokan(email+password),
      sql = `SELECT * FROM users WHERE passport = '${token}'`;
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}

exports.addUser = function(email, password) {
  let token = generateTokan(email+password);
  let sql = `INSERT INTO users (email, password, passport) VALUES ('${email}', '${password}', '${token}')`;
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}
