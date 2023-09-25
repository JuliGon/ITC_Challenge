const { Router } = require("express");
const errorHandler = require("../controllers/errorHandler");

// Imports
const booksRouter = require("./books");
const editorialsRouter = require("./editorials");

const router = Router();

// Routers
router.use("/books", booksRouter);
router.use("/editorials", editorialsRouter);

// Middleware manejo de errores
router.use(errorHandler);

module.exports = router;