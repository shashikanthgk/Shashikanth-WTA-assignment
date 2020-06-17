const express = require('express');
const router = express.Router()
const register = require('../controllers/AuthController/registeruser')
const registeradmin = require('../controllers/AuthController/registeradmin')
const login = require('../controllers/AuthController/login')
router.post('/register/employee',register.register);
router.post('/register/admin',registeradmin.registeradmin);
router.post('/login',login.login);

router.get('*', (req, res) => res.status(404).send('Page Not found 404'));

module.exports = router;