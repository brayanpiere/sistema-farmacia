const { Router } = require('express');
const { renderListar, renderAddEmp } = require('../controllers/empleado');
const router = Router();

router.route('/listar')
    .get(renderListar)

router.route('/add_Emp')
    .post(renderAddEmp)    

module.exports = router