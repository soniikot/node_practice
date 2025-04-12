const { createServer } = require("node:http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 8080;

const server = createServer((req, res) => {
  let filePath = "." + req.url;

  const extname = path.extname(filePath);

  let contentType = "text/html";
  if (extname === ".css") {
    contentType = "text/css";
  }

  if (!extname) {
    switch (req.url) {
      case "/":
        filePath = "./index.html";
        break;
      case "/about":
        filePath = "./about.html";
        break;
      case "/contact":
        filePath = "./contact-me.html";
        break;
      default:
        filePath = "./404.html";
    }
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile("./404.html", (err, content) => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(content);
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(content);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
