const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'chave-secreta-desenvolvimento';

const autenticar = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de acesso obrigatorio' });
    }

    const token = authorization.substring(7);

    try {
        req.usuario = jwt.verify(token, jwtSecret);
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido ou expirado' });
    }
};

module.exports = { autenticar };