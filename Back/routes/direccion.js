// creo el router
const direccionRouter= require('express').Router();
const direccionController= require('../controllers/DireccionController');
const userExtractor= require('../middleware/userExtractor');
const validatePrincipalDireccion= require('../validators/validatePrincipalDireccion');

// metodos del router


/**
 * @openapi
 * /direcciones/registro_direccion:
 *  post:
 *      tags: [direcciones]
 *      summary: 'Crear una direccion.'
 *      requestBody:
 *          requiered: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/direccion'
 *      responses: 
 *          200: 
 *              description: Dirección creada con exito.
 *          500: 
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
direccionRouter.post('/registro_direccion', validatePrincipalDireccion, userExtractor, direccionController.registro_direccion);

/**
 * @openapi
 * /direcciones/obtener_direcciones_cliente/{idCliente}:
 *  get:
 *      tags: [direcciones]
 *      summary: 'Devuelve todas las direcciones de un cliente'
 *      parameters: 
 *          - in: path
 *            name: idCliente
 *            required: true
 *            description: Identificador cliente en BD
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve todas las direcciones con exito.
 *              content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: #/components/schemas/direccion
 *          500:
 *              description: Token invalido o expirado.
 *          503: 
 *              description: Servidor caido, Intentalo màs tarde.
 *      security:
 *          - bearerAuth: []
 *      
 *   

 */
direccionRouter.get('/obtener_direcciones_cliente/:idCliente', userExtractor, direccionController.obtener_direcciones_cliente);



/**
 * @openapi
 * /direcciones/cambiar_direccion_principal_cliente/{id}/{idCliente}:
 *  put:
 *      tags: [direcciones]
 *      summary: Cambia la direccion a principal y vicerversa.
 *      parameters: 
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Identificador direccion en BD 
 *            example: '63b2dc2dde50c3da85958673'
 *          - in: path
 *            name: idCliente
 *            type: string
 *            required: true            
 *            description: Identificador cliente en BD
 *            example: '6391dd0578659e85b54cd402'
 *      responses: 
 *          200: 
 *              description: Se ha cambiado la direccion a principal correctamente.
 *          500:
 *              description: Token invalido o expirado.
 *      security:
 *          - bearerAuth: []
 *      
 *   
 */
direccionRouter.put('/cambiar_direccion_principal_cliente/:id/:idCliente', userExtractor, direccionController.cambiar_direccion_principal_cliente);




/**
 * @openapi
 * /direcciones/obtener_direccion_principal_cliente/{idCliente}:
 *  get:
 *      tags: [direcciones]
 *      summary: Obtiene la direccion principal del cliente
 *      parameters: 
 *          - in: path
 *            name: idCliente
 *            required: true
 *            description: Identificador cliente en BD
 *            example: '638e7880a6d65b516cadbf55'
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve la direccion.
 *              content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: #/components/schemas/cupon
 *          500:
 *              description: Token invalido o expirado.
 *          503: 
 *              description: Servidor caido, Intentalo màs tarde.
 *      security:
 *          - bearerAuth: []
 *      
 *   
 */
direccionRouter.get('/obtener_direccion_principal_cliente/:idCliente', userExtractor, direccionController.obtener_direccion_principal_cliente);

module.exports= direccionRouter;