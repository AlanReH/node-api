import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     parameters:
 *       - in: query
 *         name: sortedBy
 *         schema:
 *           type: string
 *         description: Campo para ordenar
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro en formato field+condition+value
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/users', userController.getUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: user@mail.com
 *               name: Alan
 *               phone: "+525512345678"
 *               password: "1234"
 *               tax_id: "AARR990101XXX"
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/users', userController.createUser);

export default router;