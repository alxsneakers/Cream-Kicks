

// Variable para inicializar el controlador de admin 
const adminController = require('../controllers/AdminController');
const userExtractor = require('../middleware/userExtractor');
const validateLoginAdmin = require('../middleware/validateLoginAdmin');
const validateCreateAdmin= require('../validators/createAdmin');
const valdidateChangeAccountName= require('../validators/changeNameAdmin');
const multiparty= require('connect-multiparty');
const PATH= multiparty({uploadDir: './uploads/imgPerfilAdmins'});

// Creo el router
const adminRouter = require('express').Router();

// metodos del router (api).
adminRouter
    .post('/registro_admin', validateCreateAdmin, adminController.registro_admin)
    .post('/login_admin', validateLoginAdmin, adminController.login_admin)
    .get('/allClient_admin', userExtractor , adminController.allClients_admin)
    .get('/obtenerAdmin/:id', userExtractor, adminController.obtener_admin)
    .get('/obtener_mensajes_admin', userExtractor, adminController.obtener_mensajes_admin)
    .get('/obtenerImgPerfil/:img', adminController.obtener_imgPerfil_admin)
    .put('/cerrar_mensaje_admin/:id', userExtractor, adminController.cerrar_mensaje_admin)
    .put('/actualizar_nombre_admin/:id', valdidateChangeAccountName, userExtractor, adminController.actualizar_nombre_admin)
    .put('/actualizar_imgPerfil_admin/:id', [PATH, userExtractor], adminController.actualizar_imgPerfil_admin)
    .delete('/borrar_cliente_admin/:id', userExtractor, adminController.borrar_cliente_admin)
    .delete('/borrar_cuenta_admin/:id', userExtractor, adminController.borrar_cuenta_admin);

module.exports = adminRouter;