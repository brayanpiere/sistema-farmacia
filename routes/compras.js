const { Router } = require('express');
const { renderIndex, renderRealizar, realizarCompra } = require('../controllers/compras');
const router = Router();

router.route('/')
    .get(renderIndex)
    .post(realizarCompra)

router.route('/realizar')
    .get(renderRealizar)

module.exports = router