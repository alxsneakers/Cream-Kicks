const ventaRouter= require('express').Router();
const ventaController= require('../controllers/VentaController');
const userExtractor= require('../middleware/userExtractor');

ventaRouter
    .post('/registro_compra_cliente', userExtractor, ventaController.registro_compra_cliente)
    .get('/enviar_correo_compra/:idVenta',userExtractor, ventaController.enviar_correo_compra);


module.exports= ventaRouter;
