const express = require('express');
const { body } = require('express-validator');
const VehicleController = require('../controllers/vehicle.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { validateResults } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestión de vehículos
 */

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtener todos los vehículos del usuario (o todos si es admin)
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos
 */
router.get('/', authenticateToken, VehicleController.getAll);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtener un vehículo por ID
 *     tags: [Vehiculos]
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
 *         description: Vehículo encontrado
 */
router.get('/:id', authenticateToken, VehicleController.getById);

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Registrar un nuevo vehículo
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - marca
 *               - modelo
 *               - matricula
 *               - año
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 description: Opcional, solo admins pueden asignar a otro
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               matricula:
 *                 type: string
 *               año:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vehículo creado
 */
router.post(
  '/',
  authenticateToken,
  [
    body('marca').notEmpty().withMessage('La marca es obligatoria'),
    body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
    body('matricula').notEmpty().withMessage('La matrícula es obligatoria'),
    body('año').isInt({ min: 1886, max: new Date().getFullYear() + 1 }).withMessage('Año inválido')
  ],
  validateResults,
  VehicleController.create
);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualizar un vehículo
 *     tags: [Vehiculos]
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
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               matricula:
 *                 type: string
 *               año:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('marca').optional().notEmpty().withMessage('La marca no puede estar vacía'),
    body('modelo').optional().notEmpty().withMessage('El modelo no puede estar vacío'),
    body('matricula').optional().notEmpty().withMessage('La matrícula no puede estar vacía'),
    body('año').optional().isInt({ min: 1886 }).withMessage('Año inválido')
  ],
  validateResults,
  VehicleController.update
);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     tags: [Vehiculos]
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
 *         description: Vehículo eliminado
 */
router.delete('/:id', authenticateToken, VehicleController.delete);

module.exports = router;
