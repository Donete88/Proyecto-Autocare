const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar si el usuario está autenticado mediante JWT
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // El token generalmente viene como "Bearer [token]"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Acceso denegado. No se proporcionó un token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido o expirado.' });
    }
    // Guardamos la información del usuario en la request para usarla después
    req.user = user;
    next();
  });
};

/**
 * Middleware para verificar si el usuario tiene rol de administrador
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

module.exports = { authenticateToken, isAdmin };
