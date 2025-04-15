const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req,res)=> {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
});
const hostname = "127.0.0.1";
const port = 8080;

app.use(express.static(__dirname));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
