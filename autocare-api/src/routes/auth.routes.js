const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const { validateResults } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - contraseña
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [admin, cliente]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Errores de validación o email duplicado
 */
router.post(
  '/register',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').optional().isIn(['admin', 'cliente']).withMessage('Rol inválido')
  ],
  validateResults,
  AuthController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso con token JWT
 *       401:
 *         description: Credenciales incorrectas
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validateResults,
  AuthController.login
);

module.exports = router;
