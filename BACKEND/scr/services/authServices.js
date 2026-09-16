const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const login = async (email, senha) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario)throw new Error('CREDENCIAIS_INVALIDAS');

    const confere = await bcrypt.compare(senha, usuario.senha);
    if (!confere) throw new Error('CREDENCIAIS_INVALIDAS');

    return {nome: usuario.nome, email: usuario.email};
};
module.exports = { login };