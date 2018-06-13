'use strict';
const http = require('http');
const url = require('url');

// Route Object
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

// Route Function to handle the request
function router(req, res) {
	console.log(req.url, req.method);
	// url parse method parse the request url in object
	// it provieds path and queury paremeters through more readable object
	let baseURI = url.parse(req.url, true);
	console.log(baseURI);
	// chaches the callback from route object respective to method and path
	let resolveRoute = routes[req.method][baseURI.pathname];
	if(resolveRoute != undefined) {
		// adding query parameters to request object.
		req.queryParams = baseURI.query;
		// invokes route call back
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

http.createServer(router).listen(8081);
