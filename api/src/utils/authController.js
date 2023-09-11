const { User } = require("../db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

//Función para obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Función para el registro de usuarios
const registerUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({
			where: { username: { [Op.iLike]: `%${username}%` } },
		});

		if (existingUser) {
			const error = new Error("User already exists");
			error.status = 404;
			throw error;
		}

		// Hashea la contraseña antes de almacenarla en la base de datos
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crea un nuevo usuario en la base de datos
		const newUser = await User.create({ username, password: hashedPassword });

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

// Función para la autenticación de usuarios
const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Busca al usuario por nombre de usuario
		const user = await User.findOne({ where: { username } });
		if (!user) {
			const error = new Error("Username or password incorrect");
			error.status = 401;
			throw error;
		}

		// Compara la contraseña ingresada con la almacenada en la base de datos
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			const error = new Error("Username or password incorrect");
			error.status = 401;
			throw error;
		}

		// En este punto, el usuario está autenticado con éxito
		res.json({ message: "Successful authentication" });
	} catch (error) {
		next(error);
	}
};

module.exports = { getAllUsers, registerUser, loginUser };
