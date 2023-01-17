// creo el router
const descuentoRouter= require('express').Router();
const descuentoController= require('../controllers/DescuentoController');
const userExtractor= require('../middleware/userExtractor');
const multiparty= require('connect-multiparty');
const PATH= multiparty({uploadDir: './uploads/banners'});




/**
 * @openapi
 * /descuentos/registro_descuento:
 *  post:
 *      tags: [descuentos]
 *      summary: 'Crear un descuento.'
 *      requestBody:
 *          requiered: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/descuento'
 *      responses: 
 *          200: 
 *              description: Descuento creada con exito.
 *          500: 
 *              description: Token no valido o expirado
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
descuentoRouter.post('/registro_descuento', [PATH,userExtractor], descuentoController.registro_descuento);

/**
 * @openapi
 * /descuentos/listar_descuentos:
 *  get:
 *      tags: [descuentos]
 *      summary: 'Devuelve todos los descuentos'         
 *      responses: 
 *          200: 
 *              description: 'Devuelve las descuentos correctamente.'
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/descuento'
 *          500: 
 *              description: 'Token no valido o experado.'
 *      security:
 *          - bearerAuth: []
 */
descuentoRouter.get('/listar_descuentos', userExtractor, descuentoController.listar_descuentos);


descuentoRouter.get('/obtenerBanner/:img', descuentoController.obtener_banner_descuento);


/**
 * @openapi
 * /descuentos/obtener_descuento/{id}:
 *  get:
 *      tags: [descuentos]
 *      summary: Devuelve el descuento segun su id
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador descuento en BD
 *            example: 638e7880a6d65b516cadbf55
 *            schema:
 *              type: string         
 *      responses: 
 *          200: 
 *              description: Devuelve el descuento correctamente.
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: #/components/schemas/descuento         
 *          500: 
 *              description: Token no valido o experado.
 *      security:
 *          - bearerAuth: []
 */
descuentoRouter .get('/obtener_descuento/:id', userExtractor, descuentoController.obtener_descuento);



descuentoRouter.put('/actualizar_descuento/:id', [userExtractor,PATH], descuentoController.actualizar_descuento);



/**
 * @openapi
 * /descuentos/eliminar_descuento/{id}:
 *  delete:
 *      tags: [descuentos]
 *      summary: Elimina un descuento por el identificador.     
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador descuento en BD
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: Descuento eliminado con exito.        
 *          404:
 *              description: Descuento no encontrado.
 *          500: 
 *              description: Token no valido o expirado.
 *      security:
 *          - bearerAuth: []
 */




descuentoRouter.delete('/eliminar_descuento/:id', userExtractor, descuentoController.eliminar_descuento);



/**
 * @openapi
 * /descuentos/obtener_descuento_activo:
 *  get:
 *      tags: [descuentos]
 *      summary: Devuelve los decuentos que esten acticvos.     
 *      responses: 
 *          200: 
 *              description: Devuelve los descuento activos correctamente.
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: #/components/schemas/descuento         
 *          404:
 *              description: No hay ningun descuento activo.
 *          500: 
 *              description: Token no valido o expirado.
 *      security:
 *          - bearerAuth: []
 */
descuentoRouter.get('/obtener_descuento_activo', descuentoController.obtener_descuento_activo);






module.exports= descuentoRouter;