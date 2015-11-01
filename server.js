var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require("url");

var PORT = 3000;

var MIME_TYPES = {
	'.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain'
};

/*
Similar set up to the example static file server.
Will serve the required index.html file and static files required for the browser.
Also handles the GET requests from script.js through REST.
Composed of several else if statements to determine which component is being retrieved and then will handle the JSON file
and serve the corresponding JSON object for the requested url.
*/
http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  console.log('Request: ' + request.url);
  //serves the index.html file
  if (request.url == '/') {
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
	
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  } else if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    return;
  //serves the static files
  } else if (request.url == "/index.js" || request.url == "/style.css") {
    var newfilename = filename;
    fs.readFile(newfilename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200, {"Content-Type": MIME_TYPES[path.extname(filename)]});
      response.write(file, "binary");
      response.end();
    });
    //All implementation for playlist/song handling requests here
  } else if(request.url == "/getPlaylist"){
      fs.readFile('playlist.json', "binary", function(err, data) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(data);
            response.end();
        });
  }
  //Sends a 404 response
  else {
    response.writeHead(404, "text-plain");
    response.write("404 Not Found\n");
    response.end();
  }
}).listen(PORT);

console.log('Server running at http://127.0.0.1:' + PORT + '/');