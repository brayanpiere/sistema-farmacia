const { Router } = require('express');
const { renderListar, renderListarXEmp, renderAddUsuarioEmp, renderEditUsuarioEmp } = require('../controllers/usuario');
const router = Router();

router.route('/listar')
    .get(renderListar)

router.route('/listar/:id')
    .get(renderListarXEmp)

router.route('/add_UsuarioEmp')
    .post(renderAddUsuarioEmp)

router.route('/edit_UsuarioEmp')
    .post(renderEditUsuarioEmp)
module.exports = router