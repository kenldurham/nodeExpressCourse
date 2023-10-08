const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end('Welcome');
  }
  else if(req.url === "/about") {
    res.end('Here is our short history');
  }else
  res.end(`<h1>Ooops!<h1>
  <p>Sorry does not exist<p>
  <a href="/">back home</a>`)
});
server.listen(5000);
