// Requiero el módulo nativo static 
const { static } = require('express');
// Declaro en una variable la función que permite la ejecución de static 
const statics = (folder) => static(folder);


// Exporto el módulo
module.exports = statics;