const express = require("express");
const router = express.Router();
const { Editorial } = require("../db");
const editorialController = require("../utils/editorialController")

// Ruta para obtener una editorial por su ID (hacer que el parámetro id sea opcional)
router.get("/:id", editorialController.getEditorialById);

// Ruta para obtener todas las editoriales
router.get("/", editorialController.getAllEditorials);

// Ruta para crear una nueva editorial o editoriales
router.post("/", editorialController.createEditorial);

module.exports = router;