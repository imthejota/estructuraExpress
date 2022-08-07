const { Router } = require('express');
const route = Router();
const controller = require('../controllers/products.controller');

route.get('/productos/nuevo', controller.create);
route.post('/productos/guardar', controller.save);
route.get('/productos/:categoria?', controller.index);
route.get('/productos/detalle/:producto', controller.show);



module.exports = route;