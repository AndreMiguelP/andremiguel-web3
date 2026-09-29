const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'] || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(403).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }
        
        req.usuarioId = decoded.id;
        next();
    });
};

module.exports = verificarToken;