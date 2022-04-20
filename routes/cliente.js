const { Router } = require('express');
const { renderListar, renderAddCliente, renderUpdateCliente } = require('../controllers/cliente');
const router = Router();

router.route('/listar')
    .get(renderListar)

router.route('/add_Cliente')
    .post(renderAddCliente)

router.route('/edit_Cliente')
    .post(renderUpdateCliente)  


module.exports = router