// Declaro en una variable la asignación de un puerto para el servidor web
const port = process.env.PORT || 3000;

// Declaro en una variable la función que me va a mostrar un mensaje
const start = () => console.log('Starting server')

// Exporto del módulo las 2 constantes
module.exports = { port, start };