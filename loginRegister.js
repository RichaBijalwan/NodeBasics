'use strict';
const _http = require('http');
const _url = require('url');
const _fs = require('fs');
const _qs = require('querystring');
const _db = require('./userDb');

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
				body += data.toString();
			});

			req.on('end', () => {
        var params = _qs.parse(body);
        _db.isUserExists(params.email, String(params.password))
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
				body += data.toString();
			});

			req.on('end', () => {
        var params = _qs.parse(body);
        _db.addUser(params.email, String(params.password))
        .then(res.end('You are registered !'))
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
  _db.isUserDataExists();

	let baseURI = _url.parse(req.url, true);
  
  let resolveRoute = routes[req.method][baseURI.pathname];
  
	if(resolveRoute != undefined) {
		req.queryParams = baseURI.query;
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

_http.createServer(router).listen(8081);
