const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { errorHandler } = require('./middlewares/error.middleware');

// Rutas (se importarán aquí)
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const serviceRoutes = require('./routes/service.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();

// Middlewares globales
app.use(cors()); // Permitir peticiones de otros orígenes
app.use(express.json()); // Parsear JSON en el body de las peticiones
app.use(morgan('dev')); // Logging de peticiones HTTP en consola

// Configuración de Swagger para documentación
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/vehiculos', vehicleRoutes);
app.use('/api/servicios', serviceRoutes);
app.use('/api/citas', appointmentRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de AutoCare' });
});

// Middleware de manejo de errores global (siempre debe ir al final)
app.use(errorHandler);

module.exports = app;
