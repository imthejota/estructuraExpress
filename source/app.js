// Requiero Express
const express = require('express');
// Requiero Join del módulo Path
const { join } = require('path');
// Requiero Override
const method = require('method-override')
// Declaro ejecución de Express desde la variable server
const server = express();
// Declaro config como requerimiento del módulo interno server
const config = require('./modules/server');
// Variable server (ejecución de Express) escucha el método port y start de la variable config
server.listen(config.port, config.start());


// Middlewares siempre previo a rutas ya que terminan afectándolas -> proceso en el medio
// Requiero Statics del módulo interno
const statics = require('./modules/static');

// Ejecución del middleware statics
server.use(statics(join(__dirname, "../public")));

// Url Encoded para uso de req.body
server.use(express.urlencoded({ extended: true }))
/* server.use(express.json) */

// Ejecución del middleware override
server.use(method('m'))

// Requiero rutas del módulo interno y las ejecucto
const productsRoutes = require('./routes/products.routes');
server.use(productsRoutes);

//Implementación de EJS en proyecto
server.set('views', join(__dirname, './views'))
server.set('view engine', 'ejs')


