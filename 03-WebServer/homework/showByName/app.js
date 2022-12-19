var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer((req, res) => {
    switch (req.url) {
      case "/": {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<div><h1>HOME</h1></div>");
        break;
      }
      default: {
        fs.readFile(`./images${req.url}.jpg`, (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("IMG not found");
          } else {
            res.writeHead(200, { "Content-Type": "image/jpg" });
            res.end(data);
          }
        });
      }
    }
  })
  .listen(1337, "127.0.0.1");
