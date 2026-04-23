/**
 * Utilidad para estandarizar las respuestas JSON de éxito
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Number} statusCode - Código de estado HTTP
 * @param {String} message - Mensaje descriptivo
 * @param {Object|Array} data - Datos a devolver (opcional)
 */
const sendSuccess = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess };
