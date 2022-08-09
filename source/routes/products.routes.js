// Requiero el módulo nativo router de Express
const { Router } = require('express');
// Declaro la ejecución del módulo Router dentro de una variable 
const route = Router();
// Requiero el módulo interno de los controladores
const controller = require('../controllers/products.controller');
// Requiero resolve
const {resolve, extname} = require('path');
// Requiero módulo existSync para verificar si la carpeta del multer existe o no. mkdirSync crea el dir.
const {existsSync, mkdirSync} = require('fs')

// Configuración del multer, función que toma 3 parámetros. Carpeta donde se guarda el archivo
const destination = (req, file, cb) => {
    let folder = resolve(__dirname, '..','..', 'public', 'products')
    if (!existsSync(folder)){
        mkdirSync(folder)
    }
    return cb(null, folder)
}
// Nombre del archivo que va a ser guardado
const filename = (req, file, cb) => {
    let unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // fieldname = name del input / extname extrae la extensión del archivo original
    let name = file.fieldname + '-' + unique + extname(file.originalname) ;
    return cb(null, name)
}

// Requiero multer
const multer = require('multer');
// Al multer le paso un objeto que tiene el multer.diskStorage y dentro del mismo paso otro objeto con las 2 constantes creadas antes
const upload = multer({storage: multer.diskStorage({destination, filename})})

// single('image') 1 sólo archivo -requiere el name que le haya puesto al input-, any todos los que quiera -no necesita nada-, req.file
// any() -> req.files .. al poder traer muchos es un array

// Defino de acuerdo al verbo http correspondiente la ruta junto el controlador correspondiente
route.get('/productos/nuevo', controller.create);
route.post('/productos/guardar', upload.any(), controller.save);
route.get('/productos/editar/:producto', controller.edit);
route.put('/productos/actualizar', upload.any(), controller.update);
route.get('/productos/:categoria?', controller.index);
route.get('/productos/detalle/:producto', controller.show);
route.delete('/productos/borrar', controller.remove)



// Exporto módulo de rutas
module.exports = route;

