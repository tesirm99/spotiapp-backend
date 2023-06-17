var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
const ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

/**
 * @swagger
 * /auth/getById/{id}:
 *  get:
 *    summary: Obtener información de usuario por ID
 *    description: Permite obtener información de usuario por su ID.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/getById/:id', ensureAuthenticated, authController.getUser);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: Iniciar sesión
 *    description: Permite a un usuario iniciar sesión.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SignInInput'
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TokenResponse'
 */
router.post('/signin', authController.signin);

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Registrarse
 *    description: Permite a un usuario registrarse en la aplicación.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SignupInput'
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TokenResponse'
 */
router.post('/signup', authController.signup);


module.exports = router;
