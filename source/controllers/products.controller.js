const controller = {
    index: (req, res) => {
        if (req.params.categoria) {
            return res.send('Productos de la categoria ' + req.params.categoria)
        }
        return res.send('Todos los productos')
    },
    show: (req, res) => {
        return res.send('Detalle del producto ' + req.params.producto)
    }
};


module.exports = controller;