const BD = require('../config/config');
const { Router } = require('express');
const { renderIndex, renderListar, renderAdd, renderAddCargo, renderDeleteCargo, renderUPdate, renderUpdateCargo } = require('../controllers/cargo');
const router = Router();


router.route('/')
    .get(renderIndex)

router.route('/listar')
    .get(renderListar)

router.route('/add_cargo')
    .get(renderAdd)

router.route('/add_cargo')
    .post(renderAddCargo)

router.route('/delete_cargo/:id')
    .get(renderDeleteCargo)

router.route('/edit_cargo/:id')
    .get(renderUPdate)

router.route('/edit_cargo')
    .post(renderUpdateCargo)

module.exports = router