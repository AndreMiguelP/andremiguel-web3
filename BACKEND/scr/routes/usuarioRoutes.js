const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', usuarioController.criarUsuario);

router.use(authMiddleware);

router.get('/', usuarioController.buscarUsuario);
router.get('/:id', usuarioController.buscarUsuarios);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;