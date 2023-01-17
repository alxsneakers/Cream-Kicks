const marcaRouter= require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const marcaController= require('../controllers/MarcaController');
const validateMarca = require('../validators/validateMarca');


/**
 * @openapi
 * /marcas/createMarca:
 *  post:
 *      tags: [marcas]
 *      summary: 'Crear una marca.'
 *      requestBody:
 *          requiered: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/marca'
 *      responses: 
 *          200: 
 *              description: 'Devuelve las marcas correctamente.'
 *          422: 
 *              description: 'Ya existe una marca con ese nombre.'
 *          500: 
 *              description: 'Token no valido o expirado'
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
marcaRouter.post('/createMarca', validateMarca, userExtractor, marcaController.registro_marca);

/**
 * @openapi
 * /marcas/allMarcas:
 *  get:
 *      tags: [marcas]
 *      summary: 'Devuelve todas las marcas'         
 *      responses: 
 *          200: 
 *              description: 'Devuelve las marcas correctamente.'
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/marca'
 *          500: 
 *              description: 'Token no valido o experado.'
 *      security:
 *          - bearerAuth: []
 */
marcaRouter.get('/allMarcas', userExtractor, marcaController.all_marcas);

/**
 * @openapi
 * /marcas/borrarMarca/{id}:
 *  delete:
 *      tags: [marcas]
 *      summary: 'Elimina una marca por el identificador'
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identificador marca en BD
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: 'Marca eliminada con exito.'
 *          500:
 *              description: 'Token invalido o expirado.'
 *          404:
 *              description: 'Marca no encontrada.'
 *          503: 
 *              description: 'Servidor caido, Intentalo màs tarde.'
 *      security:
 *          - bearerAuth: []
 *      
 *   

 */

marcaRouter.delete('/borrarMarca/:id', userExtractor, marcaController.eliminar_marca);


/**
 * @openapi
 * /marcas/obtenerMarcas:
 *  get:
 *      tags: [marcas]
 *      summary: 'Devuelve todas las marcas (publico)'         
 *      responses: 
 *          200: 
 *              description: 'Devuelve las marcas correctamente.'
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/marca'
 *          500: 
 *              description: 'Error interno del servidor'
 */
marcaRouter.get('/obtenerMarcas', marcaController.obtener_marcas);




/**
 * @openapi
 * /marcas/borrarSeleccionadosMarca/{idMarcas}:
 *  delete:
 *      tags: [marcas]
 *      summary: 'Elimina varias marcas por el identificador'
 *      parameters: 
 *          - in: path
 *            name: idMarcas
 *            required: true
 *            description: Identificadores de las marcas en BD --> (id,id,id,id,id)
 *            schema:
 *              type: string
 *      responses: 
 *          200: 
 *              description: 'Marcas eliminadas con exito.'
 *          500:
 *              description: 'Token invalido o expirado.'
 *          404:
 *              description: 'Marcas no encontradas.'
 *          503: 
 *              description: 'Servidor caido, Intentalo màs tarde.'
 *      security:
 *          - bearerAuth: []
 *      
 *   

 */

marcaRouter.delete('/borrarSeleccionadosMarca/:idMarcas', userExtractor, marcaController.eliminar_seleccionados_marca);




module.exports= marcaRouter;