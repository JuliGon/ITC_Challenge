const { Book } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todos los libros y aplicar filtros de nombre y descripción
const getAllBooks = async (req, res, next) => {
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
};

// Función para buscar un libro por su ID
const getBookById = async (req, res, next) => {
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
};

// Función para crear un nuevo libro
const createIndividualBook = async ({
	name,
	author,
	description,
	image_url,
	price,
	editorialId,
}) => {
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

	return newBook;
};

// Función para crear libros a partir de un array
const bulkCreateBooks = async (booksData) => {
	const books = await Book.bulkCreate(booksData);
	return books;
};

// Función para crear un nuevo libro o libros
const createBook = async (req, res, next) => {
	try {
		const requestData = req.body;

		if (Array.isArray(requestData)) {
			const books = await bulkCreateBooks(requestData);
			res.json(books);
		} else if (typeof requestData === "object") {
			const newBook = await createIndividualBook(requestData);
			res.status(201).json(newBook);
		} else {
			const error = new Error(
				"Invalid data format. Request data must be an object or an array."
			);
			error.status = 400;
			throw error;
		}
	} catch (error) {
		next(error);
	}
};

// Función para eliminar un libro por su ID
const deleteBook = async (req, res, next) => {
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
};

// Función para actualizar un libro por su ID
const updateBook = async (req, res, next) => {
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
			editorialId,
		});

		const updatedBook = await Book.findOne({
			where: { name: name },
		});

		res.json(updatedBook);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllBooks,
	getBookById,
	createBook,
	deleteBook,
	updateBook,
};
