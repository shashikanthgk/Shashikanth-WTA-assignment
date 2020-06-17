const express = require('express');
const router = express.Router()

router.use('/auth',require('./auth'));
router.use('/api',require('./api'));
router.get('*', (req, res) => res.status(404).send('Page Not found 404'));
module.exports = router;