const express = require('express');
const usuarioRoutes = require('./usuarioRoutes.js');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/auth/google', authController.loginGoogle); // <-- ROTA NOVA
router.use('/usuarios', usuarioRoutes); 

module.exports = router;