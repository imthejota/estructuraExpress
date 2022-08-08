// Requiero los métodos que necesito desde el modelo de los productos 
const { all, one, generate, write } = require('../models/products.model')

// Declaro la constante controlador
const controller = {
    // Método index
    index: (req, res) => {
        // Declaro dentro del método index la variable products que toma el módulo all()
        let products = all()
            // Si la categoría de lo que recibimos como parámetro ..
        if (req.params.categoria) {
            /* Igualo la variable products al filtro que busca si la categoría del elemento es 
            igual o no a lo que se recibe como parámetro de categoría */
            products = products.filter(e => e.category == req.params.categoria)
                // Retorna la vista renderizada del archivo list.ejs y utiliza la variable products
            return res.render('list', { products })
        }
        return res.render('list', { products })
    },
    // Método show
    show: (req, res) => {
        let product = one(req.params.producto)
        if (product) {
            return res.render('detail', { product })
        }
        return res.render('detail', { product: null })
    },
    // Método create
    create: (req, res) => {
        return res.render('create')
    },
    // Método save
    save: (req, res) => {
        let nuevo = generate(req.body)
        let todos = all();
        todos.push(nuevo);
        write(todos)
        return res.redirect('/productos/');
    },
    edit: (req, res) => {
        let product = one(req.params.producto)
        return res.render('edit', { product })

    },
    update: (req, res) => {
        let todos = all();
        let actualizado = todos.map(elemento => {
            if (elemento.sku == req.body.sku) {
                elemento.name = req.body.name;
                elemento.price = parseInt(req.body.price);
                elemento.category = req.body.category;
            }
            return elemento;
        })
        write(actualizados)
        return res.redirect('/productos/');
    }
}

// Exporto el módulo de controladores
module.exports = controller;