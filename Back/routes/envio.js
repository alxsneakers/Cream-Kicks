// creo el router
const envioRouter= require('express').Router();
const envioController= require('../controllers/EnvioController');
const userExtractor= require('../middleware/userExtractor');
const validatePrincipalDireccion= require('../validators/validatePrincipalDireccion');

/**
 * @openapi
 * /envios/registro_envio:
 *  post:
 *      tags: [envios]
 *      summary: 'Crear un tipo de envio.'
 *      requestBody:
 *          requiered: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/envio'
 *      responses: 
 *          200: 
 *              description: 'Tipo de envio creado con exito.'
 *          500: 
 *              description: 'Token no valido o expirado'
 *      security:
 *          - bearerAuth: []
 * 
 * 
 */
envioRouter.post('/registro_envio', validatePrincipalDireccion, userExtractor, envioController.registro_envio);

/**
 * @openapi
 * /envios/obtener_tipo_envio:
 *  get:
 *      tags: [envios]
 *      summary: 'Devuelve todas los envios (publico)'         
 *      responses: 
 *          200: 
 *              description: 'Devuelve los envios correctamente.'
 *              content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/envio'
 *          500: 
 *              description: 'Error interno del servidor'
 */
envioRouter.get('/obtener_tipo_envio', envioController.obtener_tipos_envio);

module.exports= envioRouter;