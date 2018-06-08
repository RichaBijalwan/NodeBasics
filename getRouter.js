'use strict';
const http = require('http');
const url = require('url');

let routes = {
	'GET': {
		'/': (req, res) => {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(`<h1>Hello Router</h1>
			<a href="/about"> About Page</a> <br />
			<a href="/api/getinfo?event=nodejs&company=AKQA"> Get Info Page</a>`);
		},
		'/about': (req, res) => {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end('<h1>This is the about page</h1>');
		},
		'/api/getinfo': (req, res) => {
			// fetch data from db and respond as JSON
			res.writeHead(200, {'Content-type': 'application/json'});
			res.end(JSON.stringify(req.queryParams));
		}
	},
	'NA': (req, res) => {
		res.writeHead(404);
		res.end('Content not found!');
	}
}

function router(req, res) {
	console.log(req.url, req.method);
	let baseURI = url.parse(req.url, true);
	console.log(baseURI);
	let resolveRoute = routes[req.method][baseURI.pathname];
	if(resolveRoute != undefined) {
		req.queryParams = baseURI.query;
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

http.createServer(router).listen(8081);
