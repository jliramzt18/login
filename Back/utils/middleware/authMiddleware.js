const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/config');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);

    if(!token){
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const tokens = authHeader.split(' ')[1];

    if (!tokens) {
        return res.status(403).json({ message: 'Token no válido' });
    }

    jwt.verify(token, jwtSecret, (err, decode) =>{
        if(err){
            return res.status(401).json({
                message: 'Token no valido'
            });
        }
        
        req.user = decode;
        next();
    });
};

exports.module = authMiddleware;