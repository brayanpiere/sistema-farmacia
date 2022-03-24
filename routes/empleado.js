const { Router } = require('express');
const { renderListar } = require('../controllers/empleado');
const router = Router();

router.route('/listar')
    .get(renderListar)

module.exports = router