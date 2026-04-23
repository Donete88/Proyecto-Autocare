const express = require('express');
const { body } = require('express-validator');
const ServiceController = require('../controllers/service.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const { validateResults } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Gestión del catálogo de servicios
 */

/**
 * @swagger
 * /api/servicios:
 *   get:
 *     summary: Obtener todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 */
router.get('/', ServiceController.getAll); // Público, para que los clientes vean qué se ofrece

/**
 * @swagger
 * /api/servicios/{id}:
 *   get:
 *     summary: Obtener un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio encontrado
 */
router.get('/:id', ServiceController.getById); // Público

/**
 * @swagger
 * /api/servicios:
 *   post:
 *     summary: Crear un nuevo servicio (Solo Admin)
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Servicio creado
 */
router.post(
  '/',
  authenticateToken,
  isAdmin,
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
  ],
  validateResults,
  ServiceController.create
);

/**
 * @swagger
 * /api/servicios/{id}:
 *   put:
 *     summary: Actualizar un servicio (Solo Admin)
 *     tags: [Servicios]
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Servicio actualizado
 */
router.put(
  '/:id',
  authenticateToken,
  isAdmin,
  [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
  ],
  validateResults,
  ServiceController.update
);

/**
 * @swagger
 * /api/servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio (Solo Admin)
 *     tags: [Servicios]
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
 *         description: Servicio eliminado
 */
router.delete('/:id', authenticateToken, isAdmin, ServiceController.delete);

module.exports = router;
