const express = require("express");
const router = express.Router();
const bookController = require("../utils/bookController"); // Importa el controlador de libros

// Ruta para obtener todos los libros y filtrar por nombre, descripción e ID
router.get("/", bookController.getBooks);

// Ruta para crear un nuevo libro o libros
router.post("/", bookController.createBook);

// Ruta para eliminar un libro por su ID
router.delete("/:id", bookController.deleteBook);

// Ruta para actualizar un libro por su ID
router.put("/:id", bookController.updateBook);

module.exports = router;

