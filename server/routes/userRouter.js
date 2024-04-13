const router = require('express').Router();
const UserController = require('../controllers/userController.js');
const validation = require('../helpers/validation.js');


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/login', UserController.login);


/**
 * @swagger
 * /api/user/register:
 *   post: 
 *     summary: Register
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               user_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/register', UserController.register);


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get All Users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       '200':
 *         description: Seccess
 */

router.get('/', validation, UserController.findAll);

module.exports = router;