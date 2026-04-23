const { validationResult } = require('express-validator');

/**
 * Middleware para validar los resultados de express-validator.
 * Si hay errores, responde con un 400 y los detalles.
 * Si no, pasa al siguiente middleware/controlador.
 */
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
};

module.exports = { validateResults };
