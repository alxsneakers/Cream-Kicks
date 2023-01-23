// creo el router
const tallaRouter= require('express').Router();
const tallaController= require('../controllers/TallaController');
const userExtractor= require('../middleware/userExtractor');
const validateTalla= require('../validators/validateTalla');



tallaRouter.post('/createMarca', validateTalla, userExtractor, tallaController.registro_talla);
tallaRouter.get('/obtenerTallas', tallaController.obtener_tallas);



module.exports= tallaRouter;