const { Router } = require('express');
const { renderListar } = require('../controllers/sucursal');
const router = Router();


router.route('/listar')
    .get(renderListar)

module.exports = router