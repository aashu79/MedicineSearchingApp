const express = require('express');
const router = express.Router();

const {createUser, login, getUser} = require('../controllers/auth.controller');

router.post('/register', createUser);
router.post('/login', login);
router.get('/user/:token', getUser);

module.exports = router;