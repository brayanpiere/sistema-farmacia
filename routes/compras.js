const { Router } = require('express');
const { renderIndex, renderRealizar } = require('../controllers/compras');
const router = Router();

router.route('/')
    .get(renderIndex)

router.route('/realizar')
    .get(renderRealizar)

module.exports = router