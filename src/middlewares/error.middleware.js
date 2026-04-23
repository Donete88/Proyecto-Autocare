/**
 * Middleware global para manejar errores no capturados
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error no capturado:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message: message,
    // Mostrar el stack trace solo en desarrollo para debugging
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = { errorHandler };
