const express = require('express');
const { body } = require('express-validator');
const AppointmentController = require('../controllers/appointment.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const { validateResults } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Gestión de citas de mantenimiento
 */

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Obtener las citas del usuario (o todas si es admin)
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas
 */
router.get('/', authenticateToken, AppointmentController.getAll);

/**
 * @swagger
 * /api/citas/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita obtenida
 */
router.get('/:id', authenticateToken, AppointmentController.getById);

/**
 * @swagger
 * /api/citas:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehiculo_id
 *               - servicio_id
 *               - fecha
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 description: Opcional, solo admins pueden asignar citas a otros
 *               vehiculo_id:
 *                 type: integer
 *               servicio_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Cita creada
 */
router.post(
  '/',
  authenticateToken,
  [
    body('vehiculo_id').isInt().withMessage('ID de vehículo inválido'),
    body('servicio_id').isInt().withMessage('ID de servicio inválido'),
    body('fecha').isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)')
  ],
  validateResults,
  AppointmentController.create
);

/**
 * @swagger
 * /api/citas/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de una cita (Solo Admin)
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, completada, cancelada]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch(
  '/:id/estado',
  authenticateToken,
  isAdmin,
  [
    body('estado').isIn(['pendiente', 'completada', 'cancelada']).withMessage('Estado inválido')
  ],
  validateResults,
  AppointmentController.updateStatus
);

/**
 * @swagger
 * /api/citas/{id}:
 *   delete:
 *     summary: Cancelar/Eliminar una cita
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita eliminada
 */
router.delete('/:id', authenticateToken, AppointmentController.delete);

module.exports = router;
