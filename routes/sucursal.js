const { Router } = require('express');
const { renderListar, renderAddSucursal, renderUpdateSucursal } = require('../controllers/sucursal');
const router = Router();


router.route('/listar')
    .get(renderListar)

router.route('/add_Sucursal')
    .post(renderAddSucursal)

router.route('/edit_Sucursal')
    .post(renderUpdateSucursal)

module.exports = router