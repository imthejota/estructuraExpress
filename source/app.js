const express = require('express');
const server = express();
const config = require('./modules/server')

server.listen(config.port, config.start());
const { join } = require('path'); // destructuración
const statics = require('./modules/static');
server.use(statics(join(__dirname, "../public")));


server.use(require('./routes/products.routes'));