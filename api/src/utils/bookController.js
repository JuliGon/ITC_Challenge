const { Op } = require("sequelize");
const { Book } = require("../db");

// Función para obtener todos los libros y aplicar filtros de nombre y descripción
async function getAllBooks(req, res, next) {
  const { name, description } = req.query;
  let whereClause = {};

  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  if (description) {
    whereClause.description = {
      [Op.iLike]: `%${description}%`,
    };
  }

  try {
    const books = await Book.findAll({
      where: whereClause,
    });

    if (books.length === 0) {
      const error = new Error("Books not found");
      error.status = 404;
      throw error;
    }

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// Función para buscar un libro por su ID
async function getBookById(req, res, next) {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
}


// Función para crear un nuevo libro o libros
async function createBook(req, res, next) {
	try {
		const requestData = req.body;

		if (Array.isArray(requestData)) {
			// Si requestData es un array, crea libros en lote
			const createdBooks = await Book.bulkCreate(requestData);
			res.json(createdBooks);
		} else if (typeof requestData === "object") {
			// Si requestData es un objeto, crea un libro individual
			const { name, author, description, image_url, price, editorialId } = requestData;
			
			const existingBook = await Book.findOne({
				where: { name: { [Op.iLike]: `%${name}%` } },
			});

			if (existingBook) {
				const error = new Error("The book already exists");
				error.status = 404;
				throw error;
			}

			const newBook = await Book.create({
				name: name,
				author: author,
				description: description,
				image_url: image_url,
				price: price,
				editorialId: editorialId,
			});
			res.status(201).json(newBook);
		} else {
			const error = new Error("Invalid data format.");
			error.status = 400; // Código de estado HTTP 400 (Bad Request)
			throw error;
		}
	} catch (error) {
		next(error);
	}
}

// Función para eliminar un libro por su ID
async function deleteBook(req, res, next) {
	const { id } = req.params;
	try {
		const deletedBook = await Book.destroy({
			where: { id: id },
		});
		if (deletedBook === 0) {
			const error = new Error("Book not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "Book deleted successfully" });
	} catch (error) {
		next(error);
	}
}

// Función para actualizar un libro por su ID
async function updateBook(req, res, next) {
	const { id } = req.params;
	const { name, author, description, image_url, price, editorialId } = req.body;

	try {
		const book = await Book.findByPk(id);

		if (!book) {
			const error = new Error("Book not found");
			error.status = 404;
			throw error;
		}

		await book.update({
			name,
			author,
			description,
			image_url,
			price,
			editorialId
		});

		const updatedBook = await Book.findOne({
			where: { name: name },
		});

		res.json(updatedBook);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllBooks,
	getBookById,
	createBook,
	deleteBook,
	updateBook,
};

