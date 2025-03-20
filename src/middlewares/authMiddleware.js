

 const jwt = require('jsonwebtoken'); 

const autenticarUsuario = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token de autenticação ausente" });
    }

    try {
        const decoded = jwt.verify(token, 'segredo'); 
        req.usuario = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({ error: "Token de autenticação inválido" });
    }
};

module.exports = autenticarUsuario;
