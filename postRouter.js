'use strict';
const _http = require('http');
const _url = require('url');
var _fs = require('fs');


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
		}
	},

	'POST': {
		'/api/login': (req, res) => {
			let body = '';
			req.on('data', data => {
				body += data;
			});

			req.on('end', () => {
				var params = JSON.parse(body);
				console.log('Username: ', params['email']);
				console.log('Password: ', params['password']);
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