const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const path = require("path");

const server = express();
server.name = "API";

require("./db.js");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Node.js - Express API",
			version: "1.0.0",
		},
		servers: [
			{
				url: "https://itc-challenge-production.up.railway.app/",
			},
		],
	},
	apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(
	"/api-doc",
	swaggerUI.serve,
	swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 	next();
});
server.use("/api", routes);

module.exports = server;