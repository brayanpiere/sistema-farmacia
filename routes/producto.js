const { Router } = require('express');
const { renderListar} = require('../controllers/producto');
const router = Router();

router.route('/listar')
    .get(renderListar)

module.exports = router