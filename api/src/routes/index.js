const { Router } = require("express");
const errorHandler = require("../utils/errorHandler");

// Imports
const booksRouter = require("./books");
const editorialsRouter = require("./editorials");
const authRouter = require("./auth");

const router = Router();

// Routers
router.use("/books", booksRouter);
router.use("/editorials", editorialsRouter);
router.use("/users", authRouter);
router.use("/auth", authRouter);


// Middleware manejo de errores
router.use(errorHandler);

module.exports = router;