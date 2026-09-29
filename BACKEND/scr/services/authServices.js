const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Usuario = require('../models/Usuario');
require('dotenv').config();

const login = async (email, senha) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) throw new Error('CREDENCIAIS_INVALIDAS');

    const confere = await bcrypt.compare(senha, usuario.senha);
    if (!confere) throw new Error('CREDENCIAIS_INVALIDAS');

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' } 
    );

    return {
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        token: token
    };
};

module.exports = { login };