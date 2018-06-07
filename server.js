var _http = require('http');

const server = _http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end("<h2>Node Basics</h2>", 'utf-8');
});

server.listen(8081);