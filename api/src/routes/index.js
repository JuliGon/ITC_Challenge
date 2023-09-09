const { Router } = require("express");
const errorHandler = require("../utils/errorHandler");

// Importar todos los routers;
const booksRouter = require("./books");
const editorialsRouter = require("./editorials");

const router = Router();

// Configurar los routers
router.use("/books", booksRouter);
router.use("/editorials", editorialsRouter);

// Middleware manejo de errores
router.use(errorHandler);

module.exports = router;