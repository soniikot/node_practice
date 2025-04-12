const { createServer } = require("node:http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 8080;

const server = createServer((req, res) => {
  let filePath = "." + req.url;

  // Get file extension
  const extname = path.extname(filePath);

  // Set content type based on file extension
  let contentType = "text/html";
  if (extname === ".css") {
    contentType = "text/css";
  }

  // Handle different routes for HTML pages
  if (!extname) {
    // If no file extension in URL
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

  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // If there's an error reading the file, serve 404.html
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
