const http = require("http");
const fs = require("fs");
// const server = http.createServer((req, res) => {
//   if(req.url==='/'){
//     res.write('main page');
//     res.end();
//   }else if(req.url==='/api'){
//     res.write('api page');
//     res.end();
//   }
// });

const server = http.createServer((req, res) => {
  // res.statusCode=200;
  // res.setHeader('Content-Type','text/plain');
  // res.statusMessage='Request is fine';
  // res.end('Hello from successfull response');
  // res.statusCode=404;
  // res.setHeader('Content-Type','text/plain');
  // res.statusMessage='Request not found';
  // res.end('File not found');
  // res.statusCode=200;
  // res.setHeader('Content-Type','application/json');
  // res.statusMessage='Request is fine';
  // res.end(JSON.stringify({name:'aaaa'}));
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.statusMessage = "Request is fine";
  //   res.write('<html>');
  //   res.write('<head><title>Response Test</title></head>');
  //   res.write('<body><h1>Body Request</h1></body>');
  //   res.write('</html>');

  fs.readFile("index2.html", (err, file) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.statusMessage = "Request not found";
      res.end("File not found");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.statusMessage = "Request found";
      res.end(file);
    }
  });
});

server.listen(3000);
console.log("Listening on port 3000");
