// Requiero los métodos que necesito desde el modelo de los productos 
const { all, one, generate, write } = require('../models/products.model')
const {unlinkSync} = require('fs');
const {resolve} = require('path');
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
        // Declaro product tomando módulo one y como parámetro de esa funcion los datos del producto que requiero
        let product = one(req.params.producto)
        // Si el producto (con lo que viene solicitado por usuario existe..)
        if (product) {
            // Devuelve la vista renderizada de detail con el objeto del producto correspondiente
            return res.render('detail', { product })
        }
        // Si el prod no existe, muestra la vista del detail pero con un null
        return res.render('detail', { product: null })
    },
    // Método create
    create: (req, res) => {
        // Renderiza la vista create
        return res.render('create')
    },
    // Método save
    save: (req, res) => {
        if (req.files && req.files.length > 0){
            req.body.image = req.files[0].filename
        } else {
            req.body.image = 'default.png'
        }
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
                elemento.image = req.files && req.files.length > 0 ? req.files[0].filename : elemento.image;
            }
            return elemento;
        })
        write(actualizado)
        return res.redirect('/productos/');
    },
    remove: (req, res) => {
        let product = one(req.params.sku);
        if (product.image != 'default.png'){
            let file = resolve(__dirname, '..', '..', 'public', 'products', product.image)
            unlinkSync(file)
        }
        let todos = all();
        let noEliminados = todos.filter(elemento => elemento.sku != req.body.sku);
        write(noEliminados);
        return res.redirect('/productos/');
    }

}

// Exporto el módulo de controladores
module.exports = controller;