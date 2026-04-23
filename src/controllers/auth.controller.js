const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendSuccess } = require('../utils/responseHandler');
const ApiError = require('../utils/errorHandler');

const AuthController = {
  /**
   * Registro de un nuevo usuario
   */
  register: async (req, res, next) => {
    try {
      const { nombre, email, contraseña, rol } = req.body;

      // Verificar si el email ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        throw new ApiError(400, 'El email ya está registrado');
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);

      // Crear el usuario en la BD
      const userId = await User.create({
        nombre,
        email,
        contraseña: hashedPassword,
        rol: rol || 'cliente' // Por defecto cliente
      });

      sendSuccess(res, 201, 'Usuario registrado exitosamente', { id: userId });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Iniciar sesión
   */
  login: async (req, res, next) => {
    try {
      const { email, contraseña } = req.body;

      // Buscar al usuario
      const user = await User.findByEmail(email);
      if (!user) {
        throw new ApiError(401, 'Credenciales incorrectas');
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(contraseña, user.contraseña);
      if (!validPassword) {
        throw new ApiError(401, 'Credenciales incorrectas');
      }

      // Crear el token JWT
      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      sendSuccess(res, 200, 'Inicio de sesión exitoso', {
        token,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AuthController;
