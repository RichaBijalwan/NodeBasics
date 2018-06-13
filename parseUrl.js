var _http = require('http');
var _fs = require('fs');
var _url = require('url');

/**
 * We create server and and handling the request
 * We parse request URL and extracts the path name
 */
const server = _http.createServer((req, res) => {
  var pathVal = _url.parse(req.url).pathname,
      uripath = __dirname +'/pages/'+ pathVal.substr(1),
      extension = pathVal.split('.').pop();
      console.log(uripath, extension);
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

});

server.listen(8081);