
// Variable para inicializar el controlador de cliente 
const clienteController = require('../controllers/ClienteController');
const validateLoginClient = require('../middleware/validateLoginClient');
const validateCreateClient= require('../validators/createClient');
const userExtractor = require('../middleware/userExtractor');

// Creo el router
const clienteRouter = require('express').Router();

// Ruta que gestiona el motodo registro_cliente - El registro manda datos al backend por lo tanto sera un metodo post
// Metodo post por que es un registro
// La ruta / registro_cliente esta vinculada al controlador clienteController al metodo registro_cliente
clienteRouter.post('/registro_cliente', validateCreateClient, clienteController.registro_cliente);




/**
 * @openapi
 * /login_cliente:
 *  post:
 *      tags: [clientes]
 *      summary: 'Login Cliente en la tienda.'
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                               type: string
 *                          password:
 *                                type: string
 *      responses: 
 *          200: 
 *              description: Devuelve el id y token del cliente.
 *          401: 
 *              description: Email o Contraseña incorrecta.
 *          500:
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
clienteRouter.post('/login_cliente', validateLoginClient, clienteController.login_cliente);




clienteRouter.post('/enviar_mensaje_contacto', clienteController.enviar_mensaje_contacto);



/**
 * @openapi
 * /obtener_cliente/{id}:
 *  get:
 *      tags: [clientes]
 *      summary: Obtiene un cliente por el identificador
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            descriiption: Indetificador cliente
 *            example: 638e7880a6d65b516cadbf55,
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve el id y token del cliente.
 *              content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cliente'
 *          500:
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
clienteRouter.get('/obtener_cliente/:id', userExtractor, clienteController.obtener_cliente);


/**
 * @openapi
 * /obtener_pedidos_cliente/{id}:
 *  get:
 *      tags: [clientes]
 *      summary: Obtiene las ventas del cliente por el identificador
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            descriiption: Indetificador cliente
 *            example: 638e7880a6d65b516cadbf55,
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve todas las ventas realizadas por el cliente
 *              content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/venta'
 *          500:
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
clienteRouter.get('/obtener_pedidos_cliente/:id', userExtractor, clienteController.obtener_pedidos_cliente);

/**
 * @openapi
 * /obtener_detalle_pedido_cliente/{id}:
 *  get:
 *      tags: [clientes]
 *      summary: Obtiene los detalles de las ventas realizadas por el cliente.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            descriiption: Indetificador cliente
 *            example: 638e7880a6d65b516cadbf55,
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve el id y token del cliente.
 *              content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/dventa'
 *          500:
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
clienteRouter.get('/obtener_detalle_pedido_cliente/:id', userExtractor, clienteController.obtener_detalle_pedido_cliente);



/**
 * @openapi
 * /actualizar_perfil/{id}:
 *  put:
 *      tags: [clientes]
 *      summary: Actualiza el cliente por el identificador
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador cliente en BD
 *            example: '638e7880a6d65b516cadbf55'
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cliente'
 *      responses: 
 *          200: 
 *              description: Cliente actualizado con exito.
 *          500:
 *              description: Token invalido o expirado.
 *          503: 
 *              description: Servidor caido, Intentalo màs tarde.
 *      security:
 *          - bearerAuth: []
 *      
 *   
 */
clienteRouter.put('/actualizar_perfil/:id', userExtractor, clienteController.actualizar_perfil);


module.exports = clienteRouter;