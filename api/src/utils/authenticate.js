const jwt = require("jsonwebtoken");

// Middleware para verificar la autenticación del usuario
const authenticate = (req, res, next) => {
  // Obtén el token de autenticación desde el encabezado de la solicitud
  const token = req.header("Authorization");

  if (!token) {
    const error = new Error("Unauthorized access. Authentication token required");
			error.status = 401;
			throw error;
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, "clave"); 

    // Adjunta la información del usuario decodificado a la solicitud
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
