'use strict';
const _http = require('http');
const _url = require('url');
const _fs = require('fs');
const mysql = require('mysql');

var dbCon = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "testdb"
});

function createUserTable () {
  let sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255), passport VARCHAR(255))";
  dbCon.query( sql, ( err, result ) => {
      if ( err )
        return false;
      return true;
  } );
}

function isUserDataExists () {
  let sql = "SELECT * FROM users";
  dbCon.query( sql, ( err, result ) => {
      if ( err )
        createUserTable();
      return true;
  } );
}

function generateTokan(str) {
  return Buffer.from(str).toString('base64');
}

function isUserExists(email, password) {
  let isUser, token = generateTokan(email+password),
      sql = `SELECT * FROM users WHERE passport = '${token}'`;
  console.log("login : "+token);
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        console.log("check : "+result);
        resolve( result );
    } );
  } );
}

function addUser(email, password) {
  let token = generateTokan(email+password);
  let sql = `INSERT INTO users (email, password, passport) VALUES ('${email}', '${password}', '${token}')`;
  console.log("add : "+token);
  return new Promise( ( resolve, reject ) => {
    dbCon.query( sql, ( err, result ) => {
        if ( err )
            return reject( err );
        resolve( result );
    } );
  } );
}

function openPage(path, res){
	let uripath = 'pages/'+path;

	_fs.readFile(uripath, function(err, data){
		if(err){
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/html');
		}else{
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');
				res.end(data, 'utf-8');
		}
		res.end();
	});
}

let routes = {
	'GET': {
		'/index.html': (req, res) => {
			openPage('/index.html', res);
    },
    '/home.html': (req, res) => {
			openPage('/home.html', res);
    },
    '/login.html': (req, res) => {
			openPage('/login.html', res);
    }
	},

	'POST': {
		'/api/login': (req, res) => {
			let body = '';
			req.on('data', data => {
				body += data;
			});

			req.on('end', () => {
        isUserExists(body.email, String(body.password))
        .then((result) => {
          if(result.toString() != ''){
            res.writeHead(301, {Location: "http://localhost:8081/home.html"});
            res.end();
          }else{
            res.writeHead(404);
            res.end('not authenticated !');
          }
          
        })
        .catch((response) => {
          console.log("error  : "+response);
        });;
				
			});
    },
    '/api/resister': (req, res) => {
			let body = '';
			req.on('data', data => {
				body += data;
			});

			req.on('end', () => {
        addUser(body.email, String(body.password))
        .then((result) => {
          res.end('You are registered !');
        })
        .catch((res) => {
          console.log("error  : "+res);
        });;
				res.end();
			});
		}
	},
	'NA': (req, res) => {
		res.writeHead(404);
		res.end('Content not found!');
	}
}

function router(req, res) {
  isUserDataExists();

	let baseURI = _url.parse(req.url, true);
  console.log(req.url, baseURI.pathname);
  
  let resolveRoute = routes[req.method][baseURI.pathname];
  
	if(resolveRoute != undefined) {
		req.queryParams = baseURI.query;
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

_http.createServer(router).listen(8081);
