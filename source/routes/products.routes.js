const { Router } = require('express');
const route = Router();
const controller = require('../controllers/products.controller');

route.get('/productos/:categoria?', controller.index)
route.get('/productos/detalle/:producto', controller.show)


module.exports = route;