const express = require("express");
const router = express.Router();
const bookController = require("../utils/bookController"); 

// Ruta para obtener un libro por su ID
router.get("/:id", bookController.getBookById);

// Ruta para obtener todos los libros y filtrar por nombre y descripción
router.get("/", bookController.getAllBooks);

// Ruta para crear un nuevo libro o libros
router.post("/", bookController.createBook);

// Ruta para eliminar un libro por su ID
router.delete("/:id", bookController.deleteBook);

// Ruta para actualizar un libro por su ID
router.put("/:id", bookController.updateBook);

module.exports = router;

