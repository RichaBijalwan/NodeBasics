// includes mysql module
var mysql = require('mysql');

var dbCon = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "testdb"
});

// CREATE DATABASE
/*function createDb () {
  let sql = "CREATE DATABASE testdb";
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        console.log(result);
        resolve( result );
    } );
  } );
}*/

// CREATE TABLE
function createTable () {
  let sql = "CREATE TABLE employee (name VARCHAR(255), id VARCHAR(255))";
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}

// INSERT ROWS
function insertRows () {
  let sql = "INSERT INTO employee (name, id) VALUES ('New Emplyee', '123456')";
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}

// SELECT DATA
function selectRows () {
  let sql = "SELECT * FROM employee";
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}

// Run all DB Commands in sequence
dbCon.connect(function(err) {
  if (err) throw err;

  createTable()
  .then(insertRows)
  .then(selectRows)
  .then((res) => {
    console.log("db created");
    console.log(res);
  })
  .catch((res) => {
    console.log("error  : "+res);
  });

});
