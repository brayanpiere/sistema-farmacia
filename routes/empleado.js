const { Router } = require('express');
const { renderListar, renderAddEmp, renderUpdateEmpleado } = require('../controllers/empleado');
const router = Router();

router.route('/listar')
    .get(renderListar)

router.route('/add_Emp')
    .post(renderAddEmp)

router.route('/edit_Emp')
    .post(renderUpdateEmpleado)        
module.exports = router