const express = require("express");
const router = express.Router();
const authController = require("../utils/authController"); 

// Ruta para obtener todos los usuarios
router.get("/users", authController.getAllUsers);

// Ruta para el registro de usuarios
router.post("/register", authController.registerUser);

// Ruta para la autenticación de usuarios
router.post("/login", authController.loginUser);

module.exports = router;