const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');


const buscarUsuario = async (req, res) => {
    try {
        const Usuario = await usuarioService.obterTodosUsuario();
        res.status(200).json({data: Usuario});
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuarios' });
    }
};

const buscarUsuarios = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await usuarioService.obterUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({error: 'Erro, usuario nao encontrado...'})
        }
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: 'Erro interno ao buscar usuario..'})
    }
};

const criarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;
    try {
        const hash = await bcrypt.hash(senha, 10);
        const usuarioNovo = await usuarioService.criarUsuario({nome, email, senha: hash});
        res.status(201).json(usuarioNovo);
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar usuario...'})
    }
};

const atualizarUsuario = async (req, res) => {
    const {id} = req.params;
    const {nome, email} = req.body;

    try {
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, {nome, email});
        if (!usuarioAtualizado) {
            return res.status(404).json({error: 'Erro, usuario nao encontrado...'});
        }
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({error: 'Erro interno ao atualizar usuario...'});
    }
};

const deletarUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const usuarioDeletado = await usuarioService.deletarUsuario(id);
        if (!usuarioDeletado) {
            return res.status(404).json({error: 'Erro, usuario nao encontrado...'});
        }
        res.status(200).json({message: 'Usuario deletado com sucesso!'});
    } catch (error) {
        res.status(500).json({error: 'Erro interno ao deletar usuario...'});
    }   
};


module.exports = {
    buscarUsuario,
    buscarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
