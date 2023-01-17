// creo el router
const cuponRouter= require('express').Router();
const cuponController= require('../controllers/CuponController');
const userExtractor= require('../middleware/userExtractor');
const validateCupon = require('../validators/validateCupon');
const validateCorrectCupon = require('../validators/validateCorrectCupon');




/**
 * @openapi
 * /cupones/createCupon:
 *  post:
 *      tags: [cupones]
 *      summary: 'Crear un cupon.'
 *      requestBody:
 *          requiered: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cupon'
 *      responses: 
 *          200: 
 *              description: 'Cupon creado con exito.'
 *          422: 
 *              description: 'Ya existe un cupon con ese nombre.'
 *          500: 
 *              description: 'Token no valido o expirado'
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
cuponRouter.post('/createCupon', validateCupon, userExtractor, cuponController.registro_cupon);






/**
 * @openapi
 * /cupones/allCupones:
 *  get:
 *      tags: [cupones]
 *      summary: 'Devuelve todos los cupones'         
 *      responses: 
 *          200: 
 *              description: 'Devuelve los cupones correctamente.'
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/cupon'
 *          500: 
 *              description: 'Token no valido o experado.'
 *      security:
 *          - bearerAuth: []
 */
cuponRouter.get('/allCupones', userExtractor, cuponController.all_cupones);



/**
 * @openapi
 * /cupones/obtenerCupon/{id}:
 *  get:
 *      tags: [cupones]
 *      summary: Obtiene un cupon por el identificador
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador cupon en BD
 *            example: '638e7880a6d65b516cadbf55'
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Devuelve el cupon.
 *              content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: #/components/schemas/cupon
 *          500:
 *              description: Token invalido o expirado.
 *          404:
 *              description: Cupon no encontrado.
 *          503: 
 *              description: Servidor caido, Intentalo màs tarde.
 *      security:
 *          - bearerAuth: []
 *      
 *   
 */
cuponRouter.get('/obtenerCupon/:id', userExtractor, cuponController.obtener_cupon);


/**
 * @openapi
 * /cupones/actualizaCupon/{id}:
 *  put:
 *      tags: [cupones]
 *      summary: Actualiza un cupon por el identificador
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador cupon en BD
 *            example: '638e7880a6d65b516cadbf55'
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cupon'
 *      responses: 
 *          200: 
 *              description: Cupon actualizado con exito.
 *          500:
 *              description: Token invalido o expirado.
 *          404:
 *              description: Cupon no encontrado.
 *          503: 
 *              description: Servidor caido, Intentalo màs tarde.
 *      security:
 *          - bearerAuth: []
 *      
 *   
 */
cuponRouter.put('/actualizaCupon/:id', validateCupon ,userExtractor, cuponController.actualizar_cupon);


/**
 * @openapi
 * /cupones/borrarCupon/{id}:
 *  delete:
 *      tags: [cupones]
 *      summary: 'Elimina un cupon por el identificador'
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador cupon en BD
 *            example: '638e7880a6d65b516cadbf55'
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: 'Cupon eliminado con exito.'
 *          500:
 *              description: 'Token invalido o expirado.'
 *          404:
 *              description: 'Cupon no encontrado.'
 *          503: 
 *              description: 'Servidor caido, Intentalo màs tarde.'
 *      security:
 *          - bearerAuth: []
 *      
 *   

 */
cuponRouter.delete('/borrarCupon/:id', userExtractor, cuponController.eliminar_cupon);


cuponRouter.get('/validarCupon/:cupon', userExtractor, validateCorrectCupon);




module.exports= cuponRouter;