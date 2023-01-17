
// Variable para inicializar el modelo de admin en el controlador
const Admin = require('../models/admin');
const Contacto = require('../models/contacto');
const Cliente= require('../models/cliente');
const Direccion= require('../models/direccion');
const fs = require('fs-extra'); // permite manegar archivos.
const path= require('path');
const bcrypt = require('bcrypt');
const jwtHelper = require('../helpers/jwt');
const { log } = require('console');

// crea un admin
const registro_admin = (async (req, res) =>{
    const { nombre, apellidos, email, password, rol, telefono } = req.body;
    // encrypt password
    const saltRounds = 10;
    const passwordHash= await bcrypt.hash(password, saltRounds);

    // creo el usuario admin
    const admin= new Admin({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        password: passwordHash,
        rol: rol,
        telefono: telefono
    });
    const savedAdmin = admin.save(); // lo guarda en la bdd.
    res.status(200).json({message: 'Usuario Admin creado con exito'});
});


// Login admin
const login_admin = (async (req,res) => {
    const body = req.body;// Va a recibir todos los datos
    // recupero el usuario por el correo.
    const user= await Admin.findOne({email: body.email});
    // asignno el usuario al token.
    res.status(200).json({token: jwtHelper.createToken(user), _id: user._id});        
});

// Devuelve todos los clientes. 1: devuelve, 0: no devuelve.
const allClients_admin = (async (req, res)=>{
    const clients= await Cliente.find(null, {nombre: 1, apellidos: 1, email: 1, _id: 1});
    res.status(200).json(clients);
});

// Obtener datos
const obtener_admin= (async (req, res)=>{
    const id= req.params['id'];
    const admin= await Admin.findById({_id: id}, {password: 0, rol: 0, __v: 0});
    res.status(200).send(admin); 
});

const obtener_mensajes_admin= (async (req, res)=>{
    const mensajes= await Contacto.find().sort({creado: -1});
    res.status(200).json(mensajes); 
});

const cerrar_mensaje_admin= (async (req, res)=>{
    const id= req.params['id'];
    const contacto= await Contacto.findByIdAndUpdate({_id: id}, {estado: 'Cerrado'});
    res.status(200).json({message: 'Contacto cerrado.'});
});


const actualizar_nombre_admin= (async (req, res)=>{
    const id= req.params['id'];
    const data= req.body.nombre;
       
    const admin= await Admin.findByIdAndUpdate({_id: id}, {
        nombre: data
    });
    res.status(200).json({message: 'Cuenta actualizada correctamente.'});
});


const actualizar_imgPerfil_admin= (async (req, res) =>{
    const id= req.params['id'];
    const imgPath= req.files.imagenPerfil.path; 
    const imagenPerfil= imgPath.split('/')[2];

    // actualzo el usuario
    const admin= await Admin.findByIdAndUpdate({_id: id}, {
        $set: {
            imgPerfil: imagenPerfil
        }
    });
    res.status(200).json({message: 'Imagen perfil actualizada.'});
});


const obtener_imgPerfil_admin= (async (req, res) => {
    const img= req.params['img'];

    fs.stat('./uploads/imgPerfilAdmins/'+img, function(err){
        if(!err){
            const path_img= './uploads/imgPerfilAdmins/'+img;
            // envio la img al frontend
            res.status(200).sendFile(path.resolve(path_img));
        }else{ // si la img no existe, le envio una por defecto.
            res.status(404).sendFile(path.resolve('./uploads/defaultPictureProfile.png'));
        }
    });
});


const borrar_cuenta_admin= (async (req, res) => {
    const id= req.params['id'];
    const admin= await Admin.findByIdAndDelete({_id: id})
        .then((result) => {
            if(!result){
                return res.status(400).json({message: 'Admin no encontrado.'});
            }
            res.status(200).json({message: 'Cuenta eliminada con exito.'});
        }).catch(err => {
            res.status(500).json({message: 'No se ha podido eliminar la cuenta.'});
        });
});


const borrar_cliente_admin= (async (req, res) => {
    const id= req.params['id'];
    const cliente= await Cliente.findByIdAndDelete({_id: id});
    const direcciones= await Direccion.deleteMany({cliente: id});
    res.status(200).json({message: 'Cliente eliminado con exito.'});
});



module.exports={
    registro_admin,
    login_admin,
    allClients_admin,
    obtener_admin,
    obtener_mensajes_admin,
    cerrar_mensaje_admin,
    actualizar_nombre_admin,
    actualizar_imgPerfil_admin,
    obtener_imgPerfil_admin,
    borrar_cuenta_admin,
    borrar_cliente_admin
};