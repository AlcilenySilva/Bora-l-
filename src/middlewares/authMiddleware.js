const jwt = require('jsonwebtoken');

function autenticarUsuario(req, res, next) {
    const token = req.header('Authorization'); 

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.usuario = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
}

module.exports = autenticarUsuario;
