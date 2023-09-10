const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const server = express();
server.name = "API";

require("./db.js");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(require('morgan')('dev'));
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 	next();
});
server.use("/api", routes);

module.exports = server;