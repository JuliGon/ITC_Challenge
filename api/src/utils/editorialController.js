const { Editorial } = require("../db");

// Función para obtener todas las editoriales
async function getAllEditorials(req, res, next) {
	try {
		const editorials = await Editorial.findAll();

		if (editorials.length === 0) {
			const error = new Error("Editorials not found");
			error.status = 404;
			throw error;
		}

		res.json(editorials);
	} catch (error) {
		next(error);
	}
}

// Función para obtener una editorial por su ID (con ID como parámetro de consulta)
async function getEditorialById(req, res, next) {
	const { id } = req.params;
	try {
		const editorial = await Editorial.findByPk(id);
		if (!editorial) {
			const error = new Error("Editorial not found");
			error.status = 404;
			throw error;
		}
		res.json(editorial);
	} catch (error) {
		next(error);
	}
}

// Función para crear una nueva editorial o editoriales
async function createEditorial(req, res, next) {
	try {
		const requestData = req.body;

		if (Array.isArray(requestData)) {
			const editorials = await Editorial.bulkCreate(requestData);
			res.json(editorials);
		} else if (typeof requestData === "object") {
			const { name, logo_url } = requestData;

			const existingEditorial = await Editorial.findOne({
				where: { name: { [Op.iLike]: `%${name}%` } },
			});

			if (existingEditorial) {
				const error = new Error("The editorial already exists");
				error.status = 404;
				throw error;
			}

			const newEditorial = await Editorial.create({
				name: name,
				logo_url: logo_url,
			});
			res.status(201).json(newEditorial);
		} else {
			if (!Array.isArray(requestData) && typeof requestData !== "object") {
				const error = new Error(
					"Invalid data format. Request data must be an object or an array."
				);
				error.status = 400;
				throw error;
			}
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllEditorials,
	getEditorialById,
	createEditorial,
};
