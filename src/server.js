require('dotenv').config();
const app = require('./app');

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/docs`);
});
