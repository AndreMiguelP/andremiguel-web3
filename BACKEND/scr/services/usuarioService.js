const Usuario = require('../models/Usuario');

const obterTodosUsuario = async () => {
    return await Usuario.findAll();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async (data) => {
    return await Usuario.create(data);
};

const atualizarUsuario = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }

    await usuario.update(data);
    return usuario;
};

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }

    await usuario.destroy();
    return usuario;
};

module.exports = { obterTodosUsuario,
    obterUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
 };