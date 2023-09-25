const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController"); 


/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Book management
 * components:
 *  schemas:
 *   Book:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Book name
 *      author:
 *        type: string
 *        description: Book author
 *      description:
 *        type: text
 *        description: Book description
 *      genre:
 *        type: string
 *        description: Book genre
 *      image:
 *        type: text
 *        description: Book cover
 *      price:
 *        type: integer
 *        description: Book price
 *      editorialId:
 *        type: integer
 *        description: Book publisher
 *    required:
 *      - name
 *      - author
 *      - description
 *      - genre
 *      - image
 *      - price
 *      - editorialId
 *    example:
 *      name: Book example
 *      author: John Doe
 *      description: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
 *      genre: Book genre
 *      image: https://example.com/image.png
 *      price: 49
 *      editorialId: 1
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */

// Ruta para obtener un libro por su ID
router.get("/:id", bookController.getBookById);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with optional filters
 *     tags: [Book]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filter books by name (optional)
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         description: Filter books by description (optional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Books obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       '404':
 *         description: No books found
 */

// Ruta para obtener todos los libros y filtrar por nombre y descripción
router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book or multiple books
 *     tags: [Book]
 *     requestBody:
 *       description: Book or array of books to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Book'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Book(s) created successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Book'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear un nuevo libro o libros
router.post("/", bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '404':
 *         description: Book not found
 */

// Ruta para eliminar un libro por su ID
router.delete("/:id", bookController.deleteBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated book data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '404':
 *         description: Book not found
 */

// Ruta para actualizar un libro por su ID
router.put("/:id", bookController.updateBook);

module.exports = router;

