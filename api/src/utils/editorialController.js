const { Editorial } = require("../db");

// Función para obtener todas las editoriales o una editorial por su ID
async function getEditorials(req, res, next) {
	const { id } = req.params;

	try {
		let editorials;

		if (id !== undefined && id !== "") {
			editorials = await Editorial.findByPk(id);

			if (!editorials) {
				const error = new Error("Editorial not found");
				error.status = 404;
				throw error;
			}
		} else {
			editorials = await Editorial.findAll();

			if (editorials.length === 0) {
				const error = new Error("Editorials not found");
				error.status = 404;
				throw error;
			}
		}

		res.json(editorials);
	} catch (error) {
		next(error);
	}
}


// Función para crear una nueva editorial o editoriales
async function createEditorial(req, res, next) {
	try {
		const requestData = req.body;

		if (Array.isArray(requestData)) {
			const createdEditorials = await Editorial.bulkCreate(requestData);
			res.json(createdEditorials);
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
				const error = new Error("Invalid data format. Request data must be an object or an array.");
				error.status = 400;
				throw error;
			}
	
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getEditorials,
	createEditorial,
};
