const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.WT_SECRET || 'default_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.user = decoded;  
        next();
    });
};

module.exports = authMiddleware;
