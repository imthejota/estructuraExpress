const { Router } = require('express');
const route = Router();

const controller = require('../controllers/products.controller')

route.get('/products/:categoria?', controller.index);
route.get('/products/detalle/:producto', controller.show);


module.exports = route;