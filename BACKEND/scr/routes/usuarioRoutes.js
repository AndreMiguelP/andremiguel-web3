const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/authMiddleware');

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.buscarUsuario);
router.get('/:id', autenticar, usuarioController.buscarUsuarios);
router.put('/:id', autenticar, usuarioController.atualizarUsuario);
router.delete('/:id', autenticar, usuarioController.deletarUsuario);

module.exports = router;