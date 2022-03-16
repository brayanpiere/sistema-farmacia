const { Router } = require('express');
const { renderLogin } = require('../controllers/users');
const router = Router();

router.route('/login')
    .get(renderLogin)

module.exports = router;