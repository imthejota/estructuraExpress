// Requiero el módulo nativo router de Express
const { Router } = require('express');
// Declaro la ejecución del módulo Router dentro de una variable 
const route = Router();
// Requiero el módulo interno de los controladores
const controller = require('../controllers/products.controller');


// Defino de acuerdo al verbo http correspondiente la ruta junto el controlador correspondiente
route.get('/productos/nuevo', controller.create);
route.post('/productos/guardar', controller.save);
route.get('/productos/editar/:producto', controller.edit);
route.get('/productos/:categoria?', controller.index);
route.get('/productos/detalle/:producto', controller.show);


// Exporto módulo de rutas
module.exports = route;