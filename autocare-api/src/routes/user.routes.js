const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/user.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const { validateResults } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', authenticateToken, isAdmin, UserController.getAll);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
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
 *         description: Usuario encontrado
 */
router.get('/:id', authenticateToken, UserController.getById);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
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
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('rol').optional().isIn(['admin', 'cliente']).withMessage('Rol inválido')
  ],
  validateResults,
  UserController.update
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario (Solo Admin)
 *     tags: [Usuarios]
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
 *         description: Usuario eliminado
 */
router.delete('/:id', authenticateToken, isAdmin, UserController.delete);

module.exports = router;
