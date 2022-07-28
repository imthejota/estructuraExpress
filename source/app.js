const express = require('express');
const server = express();
const config = require('./modules/server');
server.listen(config.port, config.start());

const { join } = require('path');
const statics = require('./modules/static');
server.use(statics(join(__dirname, "../public")));

const productsRoutes = require('./routes/products.routes');
server.use(productsRoutes);

server.set('views', join(__dirname, './views'))
server.set('view engine', 'ejs')