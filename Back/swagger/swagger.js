const swaggerJDoc= require('swagger-jsdoc');
const swaggerUi= require('swagger-ui-express');
const path= require('path');




const prueba= {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Creams Kicks",
            description: "Esta API se encarga de manejar la base de datos management-products que se usa el parte del admin y la tienda.",
            version: "1.0.0"
        },
        servers: [
            {url: 'http://localhost:4201/api/'}
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                  }
            },
            schemas: {
                admin: {
                    type: "object",
                    required: [
                    "nombre",
                    "apellidos",
                    "email",
                    "password",
                    "telefono"
                    ],
                    properties: {
                    nombre: {
                        type: "string"
                    },
                    apellidos: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    telefono: {
                        type: "string"
                    },
                    imgPerfil: {
                        type: "object"
                    }
                    },
                    example: {
                        nombre: 'Prueba Admin',
                        apellidos: 'Apellido Prueba1',
                        email: 'tuemail@gmail.com',
                        password: 'contraseñaEmcriptada',
                        telefono: '23454354',
                        imgPerfil: 'imagendeperfil.png'
                    }
                },
                cliente: {
                    type: "object",
                    required: [
                    "nombre",
                    "apellidos",
                    "email",
                    "password"
                    ],
                    properties: {
                    nombre: {
                        type: "string"
                    },
                    apellidos: {
                        type: "string"
                    },
                    pais: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    telefono: {
                        type: "string"
                    },
                    genero: {
                        type: "string"
                    },
                    f_nacimiento: {
                        type: "string"
                    },
                    dni: {
                        type: "string"
                    }
                    },
                    example: {
                        nombre: 'Prueba Cliente',
                        apellidos: 'Apellido Prueba',
                        password: 'contraseñaEmcriptada',
                        f_nacimiento: '2002-12-09',
                        genero: 'Femenino',
                        pais: 'España',
                        telefono: '45345454',
                        dni: '34543534X'
                    }
                },
                carrito: {
                    type: "object",
                    required: [
                    "producto",
                    "cliente",
                    "talla",
                    "compra"
                    ],
                    properties: {
                    producto: {
                        $ref: "#/components/schemas/producto"
                    },
                    cliente: {
                        $ref: "#/components/schemas/cliente"
                    },
                    talla: {
                        type: "string"
                    },
                    comprado: {
                        type: "date"
                    }
                    },
                    example: {

                    }
                },
                cupon: {
                    type: "object",
                    required: [
                    "codigo",
                    "tipo",
                    "valor",
                    "limite",
                    "creado"
                    ],
                    properties: {
                    codigo: {
                        type: "string"
                    },
                    tipo: {
                        type: "string"
                    },
                    valor: {
                        type: "number"
                    },
                    limite: {
                        type: "number"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        codigo: 'bienvenida',
                        tipo: 'porcentaje',
                        valor: '10',
                        limite: '100',
                        creado: '2022-12-17T13:40:04.910+00:00'
                    }
                },
                descuento: {
                    type: "object",
                    required: [
                    "titulo",
                    "banner",
                    "descuento",
                    "fecha_inicio",
                    "fecha_fin",
                    "creado"
                    ],
                    properties: {
                    titulo: {
                        type: "string"
                    },
                    banner: {
                        type: "string"
                    },
                    descuento: {
                        type: "number"
                    },
                    fecha_inicio: {
                        type: "date"
                    },
                    fecha_fin: {
                        type: "date"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        titulo: 'Promoción Enero',
                        banner: 'WZUltFWGRjYKonb7xUUY3tjd.webp',
                        descuento: 20,
                        fecha_inicio: '1/2/2023',
                        fecha_fin: '1/7/2023',
                        creado: '2023-01-08T17:57:13.445+00:00'

                    }
                },
                direccion: {
                    type: "object",
                    required: [
                    "cliente",
                    "destinatario",
                    "dni",
                    "codigoPostal",
                    "calle",
                    "provincia",
                    "ciudad",
                    "telefono",
                    "principal",
                    "creado"
                    ],
                    properties: {
                    cliente: {
                        $ref: "#/components/schemas/cliente"
                    },
                    destinatario: {
                        type: "string"
                    },
                    dni: {
                        type: "string"
                    },
                    codigoPostal: {
                        type: "string"
                    },
                    calle: {
                        type: "string"
                    },
                    provincia: {
                        type: "string"
                    },
                    ciudad: {
                        type: "string"
                    },
                    telefono: {
                        type: "string"
                    },
                    principal: {
                        type: "boolean"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        cliente: '6391dd0578659e85b54cd402',
                        destinatario: 'Destinatario Prueba',
                        dni: '11111111D',
                        codigoPostal: '28351',
                        calle: 'c/ prueba Nº2',
                        provincia: 'Madrid',
                        ciudad: 'Toledo',
                        telefono: '2345456789',
                        principal: false,
                        creado: '2023-01-02T13:16:58.245+00:00'
                    }
                },
                envio: {
                    type: "object",
                    required: [
                    "tipo",
                    "tiempo",
                    "precio",
                    "creado"
                    ],
                    properties: {
                    tipo: {
                        type: "string"
                    },
                    tiempo: {
                        type: "string"
                    },
                    precio: {
                        type: "number"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        tipo: 'Envío normal',
                        tiempo: '1-4 días laborables',
                        precio: '4',
                        creado: '2023-01-02T16:41:07.040+00:00'

                    }
                },
                marca: {
                    type: "object",
                    required: [
                    "nombre",
                    "creado"
                    ],
                    properties: {
                    nombre: {
                        type: "string"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        nombre: 'Nike',
                        creado: '2023-01-14T17:41:09.853+00:00'
                    }
                },
                producto: {
                    type: "object",
                    required: [
                    "nombre",
                    "marca",
                    "tallas",
                    "sku",
                    "portada",
                    "galeria",
                    "precioCompra",
                    "precioVenta",
                    "stockTotal",
                    "nventas",
                    "nestrellas",
                    "publicado",
                    "creado"
                    ],
                    properties: {
                    nombre: {
                        type: "string"
                    },
                    marca: {
                        type: "string"
                    },
                    tallas: {
                        type: "array",
                        items: {
                        type: "object",
                        properties: {
                            talla: {
                            type: "string"
                            },
                            stock: {
                            type: "integer"
                            }
                        }
                        }
                    },
                    sku: {
                        type: "string"
                    },
                    portada: {
                        type: "object"
                    },
                    galeria: {
                        type: "array",
                        items: {
                        type: "object"
                        }
                    },
                    precioCompra: {
                        type: "number"
                    },
                    precioVenta: {
                        type: "number"
                    },
                    stockTotal: {
                        type: "number"
                    },
                    nventas: {
                        type: "number"
                    },
                    nestrellas: {
                        type: "number"
                    },
                    publicado: {
                        type: "boolean"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        nombre: 'Nike Air Max 90 Terrascape',
                        marca: 'nike',
                        tallas: [{talla: '55', stock: '10'}, {talla: '41', stock: '15'}],
                        sku: '314209667204',
                        portada: 'l7y7MHiyxUvOzQTJaNYmUhiC.webp',
                        galeria: ['imagen.png', 'imagen2.png', 'imagen3.png'],
                        stock: 95,
                        nventas: 1,
                        nestrellas: 0,
                        publicado: true,
                        creado: '2022-12-24T17:12:30.180+00:00'

                    }
                },
                venta: {
                    type: "object",
                    required: [
                    "cliente",
                    "nventa",
                    "subtotal",
                    "envio",
                    "transaccion",
                    "estado",
                    "direccion",
                    "creado"
                    ],
                properties: {
                    cliente: {
                        $ref: "#/components/schemas/cliente"
                    },
                    nventa: {
                        type: "string"
                    },
                    subtotal: {
                        type: "number"
                    },
                    metodo: {
                        type: "string"
                    },
                    envio: {
                        $ref: "#/components/schemas/envio"
                    },
                    transaccion: {
                        type: "string"
                    },
                    cupon: {
                        type: "string"
                    },
                    estado: {
                        type: "string"
                    },
                    direccion: {
                        $ref: "#/components/schemas/direccion"
                    },
                    nota: {
                        type: "string"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        cliente: '6391dd0578659e85b54cd402',
                        nventa: '001-000001',
                        subtotal: 10,
                        envio: '63b30974faadb22cacb22ccb',
                        transaccion: 'test',
                        estado: 'procesando',
                        direccion: '63b2dc2dde50c3da85958673',
                        creado: '2023-01-09T09:56:49.182+00:00'
                    }
                },
                dventa: {
                    type: "object",
                    requiered: [
                    "cliente",
                    "producto",
                    "venta",
                    "precio",
                    "talla",
                    "creado"
                    ],
                    properties: {
                    cliente: {
                        $ref: "#/components/schemas/cliente"
                    },
                    producto: {
                        $ref: "#/components/schemas/producto"
                    },
                    venta: {
                        $ref: "#/components/schemas/venta"
                    },
                    precio: {
                        type: "number"
                    },
                    talla: {
                        type: "string"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        cliente: '6391dd0578659e85b54cd402',
                        producto: '63b92e36b3eb06dfcfca9b74',
                        venta: '63bbe5a5da0f507333e03f3c',
                        precio: 23,
                        talla: '54',
                        creado: '2023-01-09T09:56:49.184+00:00'
                    }
                },
                contacto: {
                    type: "object",
                    required: [
                    "nombre",
                    "asunto",
                    "mensaje",
                    "email",
                    "estado",
                    "creado"
                    ],
                    properties: {
                    nombre: {
                        type: "string"
                    },
                    asunto: {
                        type: "string"
                    },
                    mensaje: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    estado: {
                        type: "string"
                    },
                    creado: {
                        type: "date"
                    }
                    },
                    example: {
                        nombre: 'Pepe Torres',
                        mensaje: 'Proximo lanzamiento',
                        asunto: 'Hola buenos dias estoy interesado en el nuevo lanzamiento',
                        email: '"hectormartindama@gmail.com"',
                        estado: 'Cerrado',
                        creado: '2023-01-09T11:52:22.622+00:00'
                    }
                }
            }
        },
        tags: [
            {
                name: 'admin',
                description: 'Maneja la parte del admin'
            },
            {
                name: 'clientes',
                description: 'Usuario autenticados para comprar en la tienda.'
            },
            {
            name: "products",
            description: "Maneja la información de los clientes"
            },
            {
            name: "cupones",
            description: "Maneja los cupones"
            },
            {
            name: "marcas",
            description: "Maneja las marcas"
            },
            {
            name: "carrito",
            description: "Guarda temporalmente el carrito del cliente, antes que realize la compra."
            },
            {
            name: "direcciones",
            description: "Maneja las direcciones del cliente en la tienda."
            },
            {
            name: "envios",
            description: "Guarda los distintos tipo de envios."
            },
            {
            name: "ventas",
            description: "Maneja"
            },
            {
            name: "descuentos",
            description: "Maneja los descuentos de la tienda."
            },
            {
            name: 'contactos',
            description: 'Mensajes que cualquier persona puede dejar en la tienda'

            },
        ],
    },
    apis: [`${path.join(__dirname, '../routes/*.js')}`]
};






// Docs in JSON format
const swagegrSpec= swaggerJDoc(prueba);


const swaggerDocs= (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swagegrSpec));
    app.get('', (req, res)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagegrSpec);
    });
    console.log(`📄 Version 1 Docs are avaible at: http://localhost:${port}/api/v1/docs`);
};


module.exports= { swaggerDocs };