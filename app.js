const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  
  const extensions = ['html', 'css', 'js'];
  if (extensions.some(e => req.url.endsWith(e))) {
    fs.readFile(req.url.slice(1), 'utf8', function g(err, data) {
      if(err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('ERROR');
      }
      const ext = extensions.find(e => req.url.endsWith(e));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/' + ext);
      res.end(data);
    })
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(req.url);
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
