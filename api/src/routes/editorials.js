const express = require("express");
const router = express.Router();
const { Editorial } = require("../db");
const editorialController = require("../utils/editorialController")

// Ruta para obtener todas las editoriales o filtrar por ID
router.get("/", editorialController.getEditorials);

// Ruta para crear una nueva editorial o editoriales
router.post("/", editorialController.createEditorial);

module.exports = router;