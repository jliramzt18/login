//Rutas para alta de usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authMiddleware } = require('../utils/middleware/authMiddleware');

router.post('/createUser', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;