
// Este controlador tiene (el modelo de contacto y cliente)
const Cliente = require('../models/cliente');
const Venta = require('../models/venta');
const Dventa = require('../models/dventa');
const Contacto = require('../models/contacto');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require('bcrypt');
const jwtHelper = require('../helpers/jwt');

// Funciones cliente
const registro_cliente = (async (req, res)=>{
    const { nombre, apellidos, email, password} = req.body;
    // encrypt password
    const saltRounds = 10;
    const passwordHash= await bcrypt.hash(password, saltRounds);

    const cliente= new Cliente({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        password: passwordHash
    });
    const savedClient= cliente.save(); // lo guarda en la bdd
    res.status(200).json({message: 'OK'});
});

// Login cliente
const login_cliente = (async (req, res) =>{
    const body = req.body;// Va a recibir todos los datos
    // recupero el usuario por el campo correo.
    const user= await Cliente.findOne({email: body.email});
    // asigno el usuario al token.
    return res.status(200).json({token: jwtHelper.createToken(user), _id: user._id});    
});

// Obtener datos
const obtener_cliente= (async (req, res)=>{
    const id= req.params['id'];
    const client= await Cliente.findById({_id: id}, {__v: 0, password: 0});
    res.status(200).json({data: client}); 
});

// actualiza el perfil
const actualizar_perfil= (async (req, res)=>{
    const id= req.params['id'];
    const { nombre, apellidos, telefono, password, f_nacimiento, dni, pais, genero} = req.body;

    // si el usuario ha mandado una contrasena nueva, es decir la ha cambiado.
    if(password){ // encrypt password
        const saltRounds = 10;
        const passwordHash= await bcrypt.hash(password, saltRounds);
        
        const client= await Cliente.findByIdAndUpdate({_id: id}, 
            { $set: { // si no existen los campos en el cliente los crea e inserta.
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                f_nacimiento: f_nacimiento,
                dni: dni,
                pais: pais,
                genero: genero,
                password: passwordHash
            }
        });
        res.status(200).json({message: 'Actualizado correctamente.'});
    }else{
        const client= await Cliente.findByIdAndUpdate({_id: id}, 
            { $set: { // si no existen los campos en el cliente los crea e inserta.
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                f_nacimiento: f_nacimiento,
                dni: dni,
                pais: pais,
                genero: genero
            }
        });
        res.status(200).json({message: 'Actualizado correctamente.'});
    }
});

const enviar_mensaje_contacto= (async (req, res)=>{
    const data= req.body;
    data.estado= 'Abierto';
    const contacto= await Contacto.create(data).then(
        res =>{
            const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                user: process.env.GMAIL_ACC,
                pass: process.env.GMAIL_PASS
                }
            }));
            var mailOptions = {
                from: process.env.GMAIL_ACC,
                to: data.email, //venta.cliente.email
                subject: 'Gracias, mensaje recibido'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    );
    res.status(200).json({message: 'Mensaje enviado con exito.'});
});


const obtener_mensajes_abiertos= (async (req, res)=>{

});

const obtener_pedidos_cliente= (async (req, res)=>{
    const id= req.params['id'];
    const pedidos= await Venta.find({cliente: id}).sort({creado: -1});
    res.status(200).json(pedidos);
});

const obtener_detalle_pedido_cliente= (async (req, res)=>{
    const id= req.params['id'];
    const venta= await Venta.findById({_id: id}).populate('direccion').populate('envio');
    const detalles= await Dventa.find({venta: id}).populate('producto');
    res.status(200).json({data: venta, detalles: detalles});
});





module.exports ={
    registro_cliente,
    login_cliente,
    obtener_cliente,
    actualizar_perfil,
    enviar_mensaje_contacto,
    obtener_pedidos_cliente,
    obtener_detalle_pedido_cliente,
};      