const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const serveFile = (res, filePath, statusCode = 200) => {
  fs.readFile(path.join(__dirname, filePath), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data);
  });
};

const server = http.createServer();

server.on('request', (req, res) => {
  console.log(req.url);

  if (req.url === '/') {
    serveFile(res, 'index.html');
  } else if (req.url === '/about') {
    serveFile(res, 'about.html');
  } else if (req.url === '/contact-me') {
    serveFile(res, 'contact-me.html');
  } else {
    serveFile(res, '404.html', 404);
  }
});

server.listen(8080, () => {
  console.log('Servidor en http://localhost:8080');
});
