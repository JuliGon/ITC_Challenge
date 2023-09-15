const express = require("express");
const router = express.Router();
const { Editorial } = require("../db");
const editorialController = require("../utils/editorialController")

/**
 * @swagger
 * tags:
 *   name: Editorial
 *   description: Editorial management
 * components:
 *  schemas:
 *   Editorial:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Editorial name
 *      logo:
 *        type: text
 *        description: Editorial logo URL
 *    required:
 *      - name
 *      - logo
 *    example:
 *      name: Editorial Example
 *      logo: https://example.com/logo.png
 */


/**
 * @swagger
 * /api/editorials/{id}:
 *   get:
 *     summary: Get an editorial by ID
 *     tags: [Editorial]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Editorial identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Editorial obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Editorial'
 *       '404':
 *         description: Editorial not found
 */

// Ruta para obtener una editorial por su ID 
router.get("/:id", editorialController.getEditorialById);

/**
 * @swagger
 * /api/editorials:
 *   get:
 *     summary: Get all editorials
 *     tags: [Editorial]
 *     responses:
 *       '200':
 *         description: Editorials obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Editorial'
 *       '404':
 *         description: No editorials found
 */

// Ruta para obtener todas las editoriales
router.get("/", editorialController.getAllEditorials);

/**
 * @swagger
 * /api/editorials:
 *   post:
 *     summary: Create a new editorial or multiple editorials
 *     tags: [Editorial]
 *     requestBody:
 *       description: Editorial or array of editorials to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Editorial'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Editorial'
 *     responses:
 *       '201':
 *         description: Editorial(s) created successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Editorial'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Editorial'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear una nueva editorial o editoriales
router.post("/", editorialController.createEditorial);

/**
 * @swagger
 * /api/editorials/{id}:
 *   delete:
 *     summary: Delete an editorial by ID
 *     tags: [Editorial]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Editorial identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Editorial deleted successfully
 *       '404':
 *         description: Editorial not found
 */

// Ruta para eliminar una editorial por su ID
router.delete("/:id", editorialController.deleteEditorial);

module.exports = router;